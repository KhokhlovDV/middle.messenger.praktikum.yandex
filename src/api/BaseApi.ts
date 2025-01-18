import { HttpTransport } from '../utils';

export abstract class BaseAPI {
    protected httpTransport: HttpTransport;

    constructor(prefix: string) {
        this.httpTransport = new HttpTransport(prefix);
    }
}
