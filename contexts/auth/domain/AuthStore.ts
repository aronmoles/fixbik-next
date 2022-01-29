import AuthToken from './AuthToken';
import { Optional } from '../../shared/domain/Optional';

export default interface AuthStore {
    saveAuthToken(authToken?: AuthToken): Promise<void>;
    retrieveAuthToken(): Promise<Optional<AuthToken>>;
}
