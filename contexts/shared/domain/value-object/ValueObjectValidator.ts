import { NewableClass } from '../NewableClass';
import { PrimitiveType } from '../PrimitiveType';

export default class ValueObjectValidator {
    static validate<T>(valueObject: NewableClass<T>): (value: PrimitiveType) => string | undefined {
        return (value: PrimitiveType) => {
            try {
                // eslint-disable-next-line no-new
                new valueObject(value)
            } catch (exception: any) {
                return exception.message;
            }
            return undefined;
        }
    }
}
