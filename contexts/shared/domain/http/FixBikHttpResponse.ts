import { HttpStatus } from './HttpStatus';
import { PrimitivesObject } from '../PrimitiveType';

export default interface FixBikHttpResponse<R> {
    data?: R,
    error?: {
        code: HttpStatus,
        title: string,
        detail: string,
    },
    pagination?: {
        current:number,
        totalPages:number,
        totalElements: number,
    }
    meta?: PrimitivesObject,
}
