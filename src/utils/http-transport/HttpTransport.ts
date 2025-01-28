import { BASE_URL } from '../../constants';
import { HttpError } from './HttpError';

enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface Options {
    timeout?: number;
    headers?: Record<string, string>;
    data?: FormData | unknown;
    query?: Record<string, string>;
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

const DEFAULT_TIMEOUT = 5000;

interface ErrorWithReason {
    reason: string;
}

function isResponeWithReason(value: unknown): value is ErrorWithReason {
    return (
        typeof value === 'object' &&
        value !== null &&
        'reason' in value &&
        typeof value.reason === 'string'
    );
}

export class HttpTransport {
    constructor(private prefix: string) {}

    get: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.GET, options);

    post: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.POST, options);

    put: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.PUT, options);

    delete: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.DELETE, options);

    private request<T>(url: string, method: Methods, options: Options) {
        const {
            query = {},
            headers = {},
            timeout = DEFAULT_TIMEOUT,
            data = null,
        } = options;

        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                method,
                `${BASE_URL}${this.prefix}${url}${this.parseQueryObject(query)}`
            );
            xhr.timeout = timeout;
            xhr.onabort = () => {
                reject(new HttpError('Abort request', xhr.status));
            };
            xhr.onerror = () => {
                reject(new HttpError('Unexpected Internet Error', xhr.status));
            };
            xhr.ontimeout = () => {
                reject(new HttpError('Request Timeout', xhr.status));
            };

            xhr.onload = () => {
                if (xhr.status < 400) {
                    resolve(xhr.response as T);
                } else {
                    const message = isResponeWithReason(xhr.response)
                        ? xhr.response.reason
                        : 'Unexpected Api Error';
                    reject(new HttpError(message, xhr.status));
                }
            };
            xhr.withCredentials = true;
            xhr.responseType = 'json';

            xhr.setRequestHeader('Content-Type', 'application/json');
            // if (data && !(data instanceof FormData)) {
            //     xhr.setRequestHeader('Content-Type', 'application/json');
            // }

            Object.entries(headers).forEach(([k, v]) =>
                xhr.setRequestHeader(k, v)
            );

            if (method !== Methods.GET && data) {
                xhr.send(
                    data instanceof FormData ? data : JSON.stringify(data)
                );
            } else {
                xhr.send();
            }
        });
    }

    private parseQueryObject(query: Record<string, string>) {
        const keys = Object.keys(query);
        if (!keys.length) {
            return '';
        }
        return keys.reduce(
            (result, key, index) =>
                `${result}${key}=${query[key]}${
                    index < keys.length - 1 ? '&' : ''
                }`,
            '?'
        );
    }
}
