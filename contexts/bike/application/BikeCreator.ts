import BikeRepository from '../domain/BikeRepository';
import Service from '../../shared/infrastructure/hooks/useServiceExecutor/Service';
import AuthToken from '../../auth/domain/AuthToken';
import Bike from '../domain/Bike';

export default class BikeCreator implements Service<void> {
    constructor(
        private readonly bikeRepository: BikeRepository,
    ) {
    }

    async run(bike: Bike, authToken: AuthToken): Promise<void> {
        await this.bikeRepository.create(bike, authToken);
    }
}
