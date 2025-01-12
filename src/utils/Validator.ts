export interface ValidationResult {
    id: string;
    errorMessage: string;
}

interface RegexData {
    regex: RegExp;
    errorMessage: string;
}

export class Validator {
    static validate(data: Record<string, string>): ValidationResult[] {
        const result: ValidationResult[] = [];
        for (const key in data) {
            const value = data[key];
            const regexData = this.createRegexData(key);
            let errorMessage = '';
            for (let i = 0; i <= regexData.length - 1; i++) {
                const reg = regexData[i];
                if (!reg.regex.test(value)) {
                    errorMessage = reg.errorMessage;
                    break;
                }
            }
            result.push({
                id: key,
                errorMessage,
            });
        }
        return result;
    }

    private static createRegexData(key: string): RegexData[] {
        switch (key) {
            case 'phone':
                return [
                    {
                        regex: /^\+?\d{10,15}$/,
                        errorMessage: 'Неверный телефон',
                    },
                ];
            case 'password':
            case 'confirmedPassword':
            case 'oldPassword':
            case 'newPassword':
                return [
                    {
                        regex: /(?=.*[A-Z])(?=.*\d)/,
                        errorMessage:
                            'Должна быть хотя бы одна заглавная буква или цифра',
                    },
                    {
                        regex: /^.{8,40}$/,
                        errorMessage:
                            'Пароль дожен сожержать от 8 до 40 символов',
                    },
                ];
            case 'email':
                return [
                    {
                        regex: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
                        errorMessage: 'Неверный email',
                    },
                ];
            case 'login':
                return [
                    {
                        regex: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
                        errorMessage: 'Неверный логин',
                    },
                ];
            case 'second_name':
            case 'first_name':
                return [
                    {
                        regex: /^[A-ZА-ЯЁ][a-zа-яё-]*$/,
                        errorMessage:
                            key === 'first_name'
                                ? 'Неверное имя'
                                : 'Неверная фамилия',
                    },
                ];

            case 'message':
                return [
                    {
                        regex: /^(?!\s*$).+/,
                        errorMessage: 'Неверное сообщение',
                    },
                ];
            default:
                return [];
        }
    }
}
