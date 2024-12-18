import { DataForValidate, ValidationResult } from './Mediator';

export class Validator {
    validate(data: DataForValidate[]): ValidationResult[] {
        const result: ValidationResult[] = [];
        data.forEach((element) => {
            const { id, value } = element;
            const regexData = this.createRegexData(id);
            if (regexData) {
                result.push({
                    id,
                    errorMessage: !regexData.regex.test(value)
                        ? regexData.errorMessage
                        : '',
                });
            }
        });
        return result;
    }

    private createRegexData(key: string) {
        switch (key) {
            case 'phone':
                return {
                    regex: /^\+?\d{10,15}$/,
                    errorMessage: 'Неверный телефон',
                };
            case 'password':
            case 'confirmedPassword':
            case 'oldPassword':
            case 'newPassword':
                return {
                    regex: /^(?=(.*[A-Z]))(?=(.*\d)).{8,40}$/,
                    errorMessage: 'Неверный пароль',
                };
            case 'email':
                return {
                    regex: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
                    errorMessage: 'Неверный email',
                };
            case 'login':
                return {
                    regex: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
                    errorMessage: 'Неверный логин',
                };
            case 'second_name':
            case 'first_name':
                return {
                    regex: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
                    errorMessage:
                        key === 'first_name'
                            ? 'Неверное имя'
                            : 'Неверная фамилия',
                };

            case 'message':
                return {
                    regex: /^(?!\s*$).+/,
                    errorMessage: 'Неверное сообщение',
                };
            default:
                return null;
        }
    }
}
