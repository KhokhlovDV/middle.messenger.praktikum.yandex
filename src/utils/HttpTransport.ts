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

type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

const DEFAULT_TIMEOUT = 5000;

class HttpTransport {
    private BASE_URL = 'https://ya-praktikum.tech/api/v2';

    get: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.GET, options);

    post: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.POST, options);

    put: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.PUT, options);

    delete: HTTPMethod = (url, options = {}) =>
        this.request(url, Methods.DELETE, options);

    private request(url: string, method: Methods, options: Options) {
        const {
            query = {},
            headers = {},
            timeout = DEFAULT_TIMEOUT,
            data = null,
        } = options;

        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(
                method,
                `${this.BASE_URL}${url}${this.parseQueryObject(query)}`
            );
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;
            xhr.onload = () => {
                resolve(xhr);
            };

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            Object.entries(headers).forEach(([k, v]) =>
                xhr.setRequestHeader(k, v)
            );

            if (method !== Methods.GET) {
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

export const httpTransport = new HttpTransport();
