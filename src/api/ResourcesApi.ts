import { BaseAPI } from './BaseApi';
import { ResourceDto } from './types';

class ResourcesApi extends BaseAPI {
    upload(data: FormData) {
        return this.httpTransport.post(`/`, {
            data,
        }) as Promise<ResourceDto>;
    }
}

export const resourcesApi = new ResourcesApi('/resources');
