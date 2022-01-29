import HttpRequest from '../../domain/http/HttpRequest';
import FetchHttpClient from './FetchHttpClient';

export default class FixBikHttpClient extends FetchHttpClient {
    protected processError(request: HttpRequest<unknown>, response: Response, responseJson: any) {
        super.processError(request, response, responseJson)
        if (responseJson?.error?.detail) {
            throw new Error(responseJson?.error?.detail)
        }
    }
}
