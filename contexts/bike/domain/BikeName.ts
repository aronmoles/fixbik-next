import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';

export default class BikeName extends StringValueObject {
    static fromString(name: string): BikeName {
        return new BikeName(name)
    }

    private constructor(value: string) {
        super(value);
    }
}
