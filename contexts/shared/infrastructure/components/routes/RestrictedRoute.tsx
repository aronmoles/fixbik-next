import React, { FC } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { authModule } from '../../../../../app/container';

export const RestrictedRoute: FC<RouteProps> = ({ children }) => {
    const auth = useAuth();
    if (!auth.isAuth) {
        return <Navigate to={authModule.paths.authentication} replace={true} />;
    }
    return <>{children}</>;
};
