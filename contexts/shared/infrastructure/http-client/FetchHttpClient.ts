import HttpClient from '../../domain/http/HttpClient';
import HttpRequest from '../../domain/http/HttpRequest';
import HttpResponse from '../../domain/http/HttpResponse';

type FetchHttpConfig = {
    baseUrl?: string
};

export default class FetchHttpClient implements HttpClient {
    constructor(
        private readonly config: FetchHttpConfig,
    ) {
    }

    async execute<Res = void>(request: HttpRequest): Promise<HttpResponse<Res>> {
        const url = `${this.config?.baseUrl ?? ''}${request.url}`
        return fetch(url, {
            method: request.method,
            body: request.body ? JSON.stringify(request.body) : undefined,
            headers: request.headers ? request.headers : {},
        })
            .then(async (res: Response) => {
                const responseJson = await res.json();
                if (!res.ok) {
                    this.processError(request, res, responseJson)
                    throw new Error(`Error recuperando información`)
                }
                return ({
                    status: res.status,
                    body: responseJson,
                })
            })
    }

    protected processError(request: HttpRequest<unknown>, response: Response, responseJson: any) {
        if (request.statusErrors && request.statusErrors[response.status]) {
            throw new Error(request.statusErrors[response.status])
        } else if (request.defaultErrorMessage) {
            throw new Error(request.defaultErrorMessage)
        }
    }
}
