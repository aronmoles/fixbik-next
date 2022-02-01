import React, { FC, useEffect, useState } from 'react';
import AuthToken from '../../../auth/domain/AuthToken';
import { Loading } from '../components/ui/loading/Loading';
import AuthStore from '../../../auth/domain/AuthStore';
import { Optional } from '../../domain/Optional';

// *****************************************************************************************************************************************

interface Auth {
    isAuth: boolean,
    authToken?: AuthToken,
    login: (jwt: AuthToken) => Promise<void>,
    logout: () => Promise<void>,
}

const AuthContext = React.createContext<Auth>({
    isAuth: false,
    authToken: undefined,
    login: (token: AuthToken) => Promise.resolve(),
    logout: () => Promise.resolve(),
})

AuthContext.displayName = 'AuthContext'

// *****************************************************************************************************************************************

export function useAuth() {
    const auth = React.useContext(AuthContext)

    if (!auth) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return auth
}

// *****************************************************************************************************************************************

interface AuthProviderProps {
    authStore: AuthStore,
}

export const AuthProvider: FC<AuthProviderProps> = ({ authStore, children }) => {
    const [jwt, setJwt] = useState<AuthToken | undefined>(undefined);
    const [initialLoadedComplete, setInitialLoadedComplete] = useState(false);

    useEffect(() => {
        authStore.retrieveAuthToken()
            .then((authToken: Optional<AuthToken>) => {
                if (authToken) {
                    setJwt(authToken)
                }
                setInitialLoadedComplete(true);
            })
    }, [])

    useEffect(() => {
        authStore.saveAuthToken(jwt)
    }, [jwt])

    const login = async (token: AuthToken): Promise<void> => {
        setJwt(token);
    }

    const logout = async (): Promise<void> => {
        setJwt(undefined);
    }

    const auth = {
        isAuth: !!jwt,
        authToken: jwt,
        login,
        logout,
    }

    if (!initialLoadedComplete) {
        return <Loading/>
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}
