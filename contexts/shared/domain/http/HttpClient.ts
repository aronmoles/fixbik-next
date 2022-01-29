import HttpRequest from './HttpRequest';
import HttpResponse from './HttpResponse';

export default interface HttpClient {
    execute<Res = void>(request: HttpRequest<unknown>): Promise<HttpResponse<Res>>;
}
