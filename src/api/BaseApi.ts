import { httpTransport } from '../utils/HttpTransport';

export abstract class BaseAPI {
    constructor(protected http = httpTransport) {}
}
