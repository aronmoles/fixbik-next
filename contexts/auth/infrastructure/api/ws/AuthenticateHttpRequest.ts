import HttpRequest from '../../../../shared/domain/http/HttpRequest';
import { HttpMethod } from '../../../../shared/domain/http/HttpMethod';
import AuthUserEmail from '../../../domain/AuthUserEmail';
import AuthUserPassword from '../../../domain/AuthUserPassword';

type RequestData = {
    email: string,
    password: string,
}

export default class AuthenticateHttpRequest extends HttpRequest<RequestData> {
    static create(email: AuthUserEmail, password: AuthUserPassword) {
        return new AuthenticateHttpRequest(email, password)
    }

    private constructor(email: AuthUserEmail, password: AuthUserPassword) {
        super(
            HttpMethod.POST,
            '/auth/authenticate',
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            {
                email: email.value(),
                password: password.value(),
            },
            {
                401: 'Error en la autenticación',
            },
        );
    }
}
