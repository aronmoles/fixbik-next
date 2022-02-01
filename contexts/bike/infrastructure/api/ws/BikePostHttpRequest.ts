import HttpRequest from '../../../../shared/domain/http/HttpRequest';
import { HttpMethod } from '../../../../shared/domain/http/HttpMethod';
import AuthToken from '../../../../auth/domain/AuthToken';
import BikeDto from '../dto/Bike.dto';


export default class BikePostHttpRequest extends HttpRequest<BikeDto> {
    static create(bikeDto: BikeDto, authToken: AuthToken) {
        return new BikePostHttpRequest(bikeDto, authToken)
    }

    private constructor(bikeDto: BikeDto, authToken: AuthToken) {
        super(
            HttpMethod.POST,
            `/bike/${bikeDto.id}`,
            {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${authToken.toString()}`,
            },
            bikeDto,
            {
                401: 'Error en la autenticación',
            },
        );
    }
}
