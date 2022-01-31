import BikeRepository from '../domain/BikeRepository';
import Bike from '../domain/Bike';
import Service from '../../shared/infrastructure/hooks/useServiceExecutor/Service';
import AuthToken from '../../auth/domain/AuthToken';

export default class BikeList implements Service<Bike[]> {
    constructor(
        private readonly bikeRepository: BikeRepository,
    ) {
    }

    run(authToken: AuthToken): Promise<Bike[]> {
        return this.bikeRepository.findAll(authToken);
    }
}
