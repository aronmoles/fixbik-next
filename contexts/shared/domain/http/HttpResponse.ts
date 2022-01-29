import { HttpStatus } from './HttpStatus';

export default interface HttpResponse<B> {
    status: HttpStatus,
    body: B,
}
