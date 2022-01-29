import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class AuthToken extends StringValueObject {
    static fromString(authTokenString: string) {
        return new AuthToken(authTokenString);
    }
}
