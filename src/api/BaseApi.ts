import { HttpTransport } from '../utils/http-transport';

export abstract class BaseAPI {
    protected httpTransport: HttpTransport;

    constructor(prefix: string) {
        this.httpTransport = new HttpTransport(prefix);
    }
}
