import { FC, useState } from 'react';
import { AuthenticateView } from './AuthenticateView';
import AuthUserEmail from '../../../domain/AuthUserEmail';
import AuthUserPassword from '../../../domain/AuthUserPassword';
import Authenticator from '../../../application/Authenticator';
import { useAuth } from '../../../../shared/infrastructure/auth/AuthProvider';

type AuthenticateDataContainerProps = {
    authenticator: Authenticator,
}

export const AuthenticateDataContainer: FC<AuthenticateDataContainerProps> = ({ authenticator }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();

    const { login } = useAuth();

    const handleAuthenticate = (email: AuthUserEmail, password: AuthUserPassword) => {
        setLoading(true)
        authenticator.run(email, password)
            .then((authToken) => {
                login(authToken)
            })
            .catch((exception) => setError(exception.message))
            .finally(() => setLoading(false))
    }

    return (
        <AuthenticateView
            onAuthenticate={handleAuthenticate}
            loading={loading}
            error={error}
        />
    )
}
