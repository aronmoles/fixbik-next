import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeModel extends StringValueObject {
    static fromString(name: string): BikeModel {
        return new BikeModel(name)
    }

    constructor(value: string) {
        super(value);
        if (!value) {
            throw new Error('Model is required')
        }
    }
}
