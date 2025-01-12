import { BaseAPI } from './BaseApi';
import { SignInDto, SignUpDto } from './types';

class AuthApi extends BaseAPI {
    private path = '/auth';

    signIn(data: SignInDto) {
        return this.http.post(`${this.path}/signup`, { data });
    }

    signUp(data: SignUpDto) {}

    logout() {}
}

export const authApi = new AuthApi();
