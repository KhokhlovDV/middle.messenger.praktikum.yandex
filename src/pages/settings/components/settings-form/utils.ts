import { UserData } from '../../../../store/Store';
import { InlineFormField } from '../inline-form-field';

const infoFormFields = [
    { id: 'email', type: 'email', label: 'Почта' },
    { id: 'login', type: 'text', label: 'Логин' },
    { id: 'first_name', type: 'text', label: 'Имя' },
    { id: 'second_name', type: 'text', label: 'Фамилия' },
    { id: 'phone', type: 'tel', label: 'Телефон' },
];

const passwordFormFields = [
    { id: 'oldPassword', label: 'Старый пароль', type: 'password' },
    { id: 'newPassword', label: 'Новый пароль', type: 'password' },
    {
        id: 'confirmedPassword',
        label: 'Повторите новый пароль',
        type: 'password',
    },
];

export type FieldsData = Partial<
    Omit<UserData, 'id' | 'display_name' | 'avatar'>
>;

export function createFormFields({
    disabled,
    isPasswordFields,
    onBlur,
    data,
}: {
    disabled: boolean;
    isPasswordFields: boolean;
    onBlur: (id: string, value: string) => void;
    data: FieldsData;
}) {
    const defaultOptions = {
        disabled,
        onBlur,
        placeholder: isPasswordFields ? '*****' : '',
    };

    const result = new Map<string, InlineFormField>();
    const fields = isPasswordFields ? passwordFormFields : infoFormFields;

    fields.forEach((el) => {
        const value =
            !isPasswordFields && el.id in data
                ? String(data[el.id as keyof typeof data])
                : '';
        result.set(
            el.id,
            new InlineFormField({
                ...el,
                ...defaultOptions,
                value,
            })
        );
    });

    return result;
}
