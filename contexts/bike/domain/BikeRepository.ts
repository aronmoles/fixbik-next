import Bike from './Bike';
import AuthToken from '../../auth/domain/AuthToken';

export default interface BikeRepository {
    findAll(authToken: AuthToken): Promise<Bike[]>;
    create(bike: Bike, authToken: AuthToken): Promise<void>;

    /*
    find(id: BikeId): Promise<Bike>;
    save(bike: Bike): Promise<void>;
    delete(bikeId: BikeId): Promise<void>;
    */
}
