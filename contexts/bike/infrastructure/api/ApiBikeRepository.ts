import HttpClient from '../../../shared/domain/http/HttpClient';
import FixBikHttpResponse from '../../../shared/domain/http/FixBikHttpResponse';
import BikeRepository from '../../domain/BikeRepository';
import Bike from '../../domain/Bike';
import BikeDto from './dto/Bike.dto';
import BikesGetHttpRequest from './ws/BikesGetHttpRequest';
import AuthToken from '../../../auth/domain/AuthToken';
import BikeId from '../../domain/BikeId';
import BikeName from '../../domain/BikeName';
import BikeBrand from '../../domain/BikeBrand';
import BikeModel from '../../domain/BikeModel';
import BikeYear from '../../domain/BikeYear';
import BikePostHttpRequest from './ws/BikePostHttpRequest';

export default class ApiBikeRepository implements BikeRepository {
    constructor(
        private readonly httpClient: HttpClient,
    ) {
    }

    findAll(authToken: AuthToken): Promise<Bike[]> {
        return this.httpClient
            .execute<FixBikHttpResponse<BikeDto[]>>(BikesGetHttpRequest.create(authToken))
            .then((response) => response.body.data!.map(this.convertDtoToEntity));
    }

    create(bike: Bike, authToken: AuthToken): Promise<void> {
        return this.httpClient
            .execute<FixBikHttpResponse<void>>(BikePostHttpRequest.create(this.convertEntityToDto(bike), authToken))
            .then(() => {})
    }

    private convertDtoToEntity(dto: BikeDto): Bike {
        return new Bike(
            BikeId.fromString(dto.id),
            BikeName.fromString(dto.name),
            BikeBrand.fromString(dto.brand),
            BikeModel.fromString(dto.model),
            new BikeYear(dto.year),
        );
    }

    private convertEntityToDto(bike: Bike): BikeDto {
        return ({
            id: bike.id.value(),
            name: bike.name.value(),
            brand: bike.brand.value(),
            model: bike.model.value(),
            year: bike.year.value(),
        });
    }

    /*
        delete(bikeId: BikeId): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: BikeId): Promise<Bike> {
            return Promise.resolve(undefined);
        }

        save(bike: Bike): Promise<void> {
            return Promise.resolve(undefined);
        }
        */
}
