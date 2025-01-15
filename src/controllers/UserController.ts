import { userApi } from '../api';
import { UpdateUserPasswordDto, UpdateUserPersonalDataDto } from '../api/types';
import { appStore } from '../store';
import { BaseController } from './BaseController';

class UserController extends BaseController {
    async profile(data: UpdateUserPersonalDataDto) {
        try {
            const result = await userApi.profile(data);
            appStore.set('user', result);
        } catch (error) {
            this.handleError(error);
        }
    }

    async profileAvatar(data: FormData) {
        try {
            const result = await userApi.profileAvatar(data);
            appStore.set('user', result);
        } catch (error) {
            this.handleError(error);
        }
    }

    async password(data: UpdateUserPasswordDto) {
        try {
            await userApi.password(data);
        } catch (error) {
            this.handleError(error);
        }
    }
}

export const userController = new UserController();
