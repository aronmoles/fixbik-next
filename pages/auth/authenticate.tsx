import Authenticator from '../../contexts/auth/application/Authenticator';
import { authRepository } from '../container';
import { AuthenticateDataContainer } from '../../contexts/auth/infrastructure/pages/authentication/AuthenticateDataContainer';
import { NextApplicationPage } from '../next-application-page';
import { useAuth } from '../../contexts/shared/infrastructure/auth/AuthProvider';
import { useRouter } from 'next/router';
import Route from '../route';

const Authenticate: NextApplicationPage = () => {
    const { isAuth } = useAuth();
    const router = useRouter();

    if (isAuth) {
        router.replace(Route.HOME)
    }

    return (
        <AuthenticateDataContainer
            authenticator={new Authenticator(authRepository)}
        />
    );
}

export default Authenticate
