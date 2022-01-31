import Uuid from '../../shared/domain/value-object/Uuid';

export default class BikeId extends Uuid {
    static fromString(id: string): BikeId {
        return new BikeId(id);
    }
}
