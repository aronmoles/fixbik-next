import AuthRepository from '../domain/AuthRepository';
import AuthUserEmail from '../domain/AuthUserEmail';
import AuthUserPassword from '../domain/AuthUserPassword';
import AuthToken from '../domain/AuthToken';

export default class Authenticator {
    constructor(
        private readonly authRepository: AuthRepository,
    ) {
    }

    run(email: AuthUserEmail, password: AuthUserPassword): Promise<AuthToken> {
        return this.authRepository.authenticate(email, password);
    }
}
