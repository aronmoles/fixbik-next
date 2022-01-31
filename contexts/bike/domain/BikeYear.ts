import { NumberValueObject } from '../../shared/domain/value-object/NumberValueObject';

export default class BikeYear extends NumberValueObject {
    constructor(value: number) {
        super(value);
    }
}
