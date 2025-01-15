export interface ValidationResult {
    id: string;
    errorMessage: string;
    value: string;
}

interface RegexData {
    regex: RegExp;
    errorMessage: string;
}

const PairFields = [['password', 'confirmedPassword']];

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
                value,
            });
        }
        return result;
    }

    private static createRegexData(key: string): RegexData[] {
        switch (key) {
            case 'phone':
                return [
                    {
                        regex: /^\+?\d+$/,
                        errorMessage:
                            'Должен состоять из цирф(может начинаться с плюса)',
                    },
                    {
                        regex: /^.{10,15}$/,
                        errorMessage: 'Должен сожержать от 10 до 15 символов',
                    },
                ];
            case 'password':
            case 'confirmedPassword':
            case 'oldPassword':
            case 'newPassword':
                return [
                    {
                        regex: /^.{8,40}$/,
                        errorMessage: 'Должен сожержать от 8 до 40 символов',
                    },
                    {
                        regex: /(?=.*[A-Z])(?=.*\d)/,
                        errorMessage:
                            'Должна быть хотя бы одна заглавная буква или цифра',
                    },
                ];
            case 'email':
                return [
                    {
                        regex: /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
                        errorMessage: 'Неверный формат email',
                    },
                ];
            case 'login':
                return [
                    {
                        regex: /^.{3,20}$/,
                        errorMessage: 'Должен сожержать от 3 до 20 символов',
                    },
                    {
                        regex: /^(?!\d+$).+/,
                        errorMessage: 'Не должен состоять только из цифр',
                    },
                    {
                        regex: /^[a-zA-Z0-9_-]+$/,
                        errorMessage:
                            'Допустимы только латинца, цирфы, дефис и нижнее подчеркивание',
                    },
                ];
            case 'second_name':
            case 'first_name':
                return [
                    {
                        regex: /^.+$/,
                        errorMessage: 'Не должно быть пустым',
                    },
                    {
                        regex: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
                        errorMessage:
                            'Допустима латиница или кириллица и дефис',
                    },
                    {
                        regex: /^[A-ZА-ЯЁ]/,
                        errorMessage: 'Первая буква должна быть заглавной',
                    },
                ];

            case 'message':
                return [
                    {
                        regex: /^.+$/,
                        errorMessage: 'Не должно быть пустым',
                    },
                ];
            default:
                return [];
        }
    }
}
