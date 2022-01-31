import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeModel extends StringValueObject {
    static fromString(name: string): BikeModel {
        return new BikeModel(name)
    }

    private constructor(value: string) {
        super(value);
    }
}
