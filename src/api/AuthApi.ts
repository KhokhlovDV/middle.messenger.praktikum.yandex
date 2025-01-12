import { BaseAPI } from './BaseApi';
import { SignInDto, SignUpDto, UserDto } from './types';

class AuthApi extends BaseAPI {
    signIn(data: SignInDto) {
        return this.httpTransport.post(`/signin`, { data });
    }

    signUp(data: SignUpDto) {
        return this.httpTransport.post(`/signup`, { data });
    }

    logout() {
        return this.httpTransport.post(`/logout`);
    }

    getUser() {
        return this.httpTransport.get(`/user`) as Promise<UserDto>;
    }
}

export const authApi = new AuthApi('/auth');
