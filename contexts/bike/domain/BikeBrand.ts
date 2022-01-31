import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeBrand extends StringValueObject {
    static fromString(name: string): BikeBrand {
        return new BikeBrand(name)
    }

    private constructor(value: string) {
        super(value);
    }
}
