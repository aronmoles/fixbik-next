import CookieStore from '../../../shared/infrastructure/store/cookie-store';
import AuthStore from '../../domain/AuthStore';
import { Optional } from '../../../shared/domain/Optional';
import AuthToken from '../../domain/AuthToken';

export default class AuthCookieStore extends CookieStore implements AuthStore {
    private AUTH_TOKEN_KEY = 'auth-token-key';
    private AUTH_TOKEN_DURATION_IN_SECONDS = 60 * 60 * 2;

    async retrieveAuthToken(): Promise<Optional<AuthToken>> {
        const authTokenString = await super.get(this.AUTH_TOKEN_KEY);
        if (!authTokenString) {
            return undefined;
        }
        return AuthToken.fromString(authTokenString);
    }

    async saveAuthToken(authToken?: AuthToken): Promise<void> {
        await super.set(
            this.AUTH_TOKEN_KEY,
            authToken?.value() || null,
            {
                maxAge: this.AUTH_TOKEN_DURATION_IN_SECONDS,
            },
        )
    }
}
