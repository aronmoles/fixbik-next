import AuthRepository from '../../../../contexts/auth/domain/AuthRepository';
import AuthUserEmail from '../../../../contexts/auth/domain/AuthUserEmail';
import AuthUserPassword from '../../../../contexts/auth/domain/AuthUserPassword';
import AuthToken from '../../../../contexts/auth/domain/AuthToken';

export default class MockAuthRepository implements AuthRepository {
    private readonly authenticateMock: jest.Mock;

    constructor() {
        this.authenticateMock = jest.fn()
        this.authenticateMock.mockReturnValue(new AuthToken('abcd'))
    }

    async authenticate(email: AuthUserEmail, password: AuthUserPassword): Promise<AuthToken> {
        return this.authenticateMock(email, password);
    }

    authenticateShouldHaveBeenCalled() {
        expect(this.authenticateMock).toHaveBeenCalled()
    }
}
