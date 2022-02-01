import { NumberValueObject } from '../../shared/domain/value-object/NumberValueObject';

export default class BikeYear extends NumberValueObject {
    public static readonly MIN_YEAR = 1970;
    public static readonly MAX_YEAR = 2030;


    constructor(value: number) {
        super(value);
        if (!value) {
            throw new Error('year is required')
        }
        if (value < BikeYear.MIN_YEAR || value > BikeYear.MAX_YEAR) {
            throw new Error('year is not in a valid range')
        }
    }
}
