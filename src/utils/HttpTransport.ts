enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

interface Options {
    timeout?: number;
    headers?: Record<string, string>;
    data?: FormData;
    query?: Record<string, string>;
}

const DEFAULT_TIMEOUT = 5000;

export class HttpTransport {
    get = (url: string, options: Options = {}) =>
        this.request(url, Methods.GET, options);

    post = (url: string, options: Options = {}) =>
        this.request(url, Methods.POST, options);

    put = (url: string, options: Options = {}) =>
        this.request(url, Methods.PUT, options);

    delete = (url: string, options: Options = {}) =>
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

            xhr.open(method, `${url}${this.parseQueryObject(query)}`);
            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            xhr.onload = () => {
                resolve(xhr);
            };

            Object.entries(headers).forEach(([k, v]) =>
                xhr.setRequestHeader(k, v)
            );

            if (method !== Methods.GET) {
                xhr.send(data);
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
