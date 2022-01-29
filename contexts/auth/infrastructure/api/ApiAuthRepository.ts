import AuthRepository from '../../domain/AuthRepository';
import HttpClient from '../../../shared/domain/http/HttpClient';
import AuthUserEmail from '../../domain/AuthUserEmail';
import AuthUserPassword from '../../domain/AuthUserPassword';
import AuthToken from '../../domain/AuthToken';
import AuthenticateHttpRequest from './ws/AuthenticateHttpRequest';
import FixBikHttpResponse from '../../../shared/domain/http/FixBikHttpResponse';

type AuthenticateResponse = FixBikHttpResponse<{
    authToken: string,
}>

export default class ApiAuthRepository implements AuthRepository {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    authenticate(email: AuthUserEmail, password: AuthUserPassword): Promise<AuthToken> {
        const request = AuthenticateHttpRequest.create(email, password);
        return this.httpClient.execute<AuthenticateResponse>(request)
            .then((response) => new AuthToken(response.body.data!.authToken));
    }
}
