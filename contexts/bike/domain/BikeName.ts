import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeName extends StringValueObject {
    static fromString(name: string): BikeName {
        return new BikeName(name)
    }

    constructor(value: string) {
        super(value);
        if (!value) {
            throw new Error('Name is required')
        }
    }
}
