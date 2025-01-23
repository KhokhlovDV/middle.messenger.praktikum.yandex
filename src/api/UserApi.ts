import { BaseAPI } from './BaseApi';
import {
    UpdateUserPasswordDto,
    UpdateUserPersonalDataDto,
    UserDto,
    UserSearchDto,
    UserSearchResultsDto,
} from './types';

class UserApi extends BaseAPI {
    profile(data: UpdateUserPersonalDataDto) {
        return this.httpTransport.put(`/profile`, { data }) as Promise<UserDto>;
    }

    profileAvatar(data: FormData) {
        return this.httpTransport.put(`/profile/avatar`, {
            data,
        }) as Promise<UserDto>;
    }

    password(data: UpdateUserPasswordDto) {
        return this.httpTransport.put(`/password`, { data });
    }

    search(data: UserSearchDto) {
        return this.httpTransport.post(`/search`, {
            data,
        }) as Promise<UserSearchResultsDto>;
    }
}

export const userApi = new UserApi('/user');
