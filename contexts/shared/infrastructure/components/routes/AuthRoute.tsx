import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { bikeModule } from '../../../../../app/container';

export const AuthRoute: FC<{}> = ({ children }) => {
    const auth = useAuth();

    if (auth.isAuth) {
        return <Navigate to={bikeModule.paths.bikeList} replace={true}/>;
    }

    return <>{children}</>;
};
