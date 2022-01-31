import HttpRequest from '../../../../shared/domain/http/HttpRequest';
import { HttpMethod } from '../../../../shared/domain/http/HttpMethod';
import AuthToken from '../../../../auth/domain/AuthToken';


export default class BikesGetHttpRequest extends HttpRequest<void> {
    static create(authToken: AuthToken) {
        return new BikesGetHttpRequest(authToken)
    }

    private constructor(authToken: AuthToken) {
        super(
            HttpMethod.GET,
            '/bike',
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${authToken.toString()}`,
            },
            undefined,
            {
                401: 'Error en la autenticación',
            },
        );
    }
}
