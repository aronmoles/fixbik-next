import { HttpMethod } from './HttpMethod';
import { Optional } from '../Optional';

export default class HttpRequest<B = void> {
    constructor(
        private readonly _method: HttpMethod,
        private readonly _url: string,
        private readonly _headers?: {[name: string]: string},
        private readonly _body?: B,

        private readonly _statusErrors?: {[status: number]: string},
        private readonly _defaultErrorMessage?: string,
    ) {
    }

    get method(): HttpMethod {
        return this._method;
    }

    get url(): string {
        return this._url;
    }

    get headers(): { [p: string]: string } {
        return this._headers ?? {};
    }

    get body(): Optional<B> {
        return this._body;
    }

    get statusErrors(): { [p: number]: string } {
        return this._statusErrors ?? {};
    }

    get defaultErrorMessage(): Optional<string> {
        return this._defaultErrorMessage;
    }
}
