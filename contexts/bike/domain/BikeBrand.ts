import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeBrand extends StringValueObject {
    static fromString(name: string): BikeBrand {
        return new BikeBrand(name)
    }

    constructor(value: string) {
        super(value);
        if (!value) {
            throw new Error('Model is required')
        }
    }
}
