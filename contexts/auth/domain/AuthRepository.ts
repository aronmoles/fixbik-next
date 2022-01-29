import AuthUserEmail from './AuthUserEmail';
import AuthUserPassword from './AuthUserPassword';
import AuthToken from './AuthToken';

export default interface AuthRepository {
    authenticate(email: AuthUserEmail, password: AuthUserPassword): Promise<AuthToken>;
}
