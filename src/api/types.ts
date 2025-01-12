export interface SignUpDto {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignInDto {
    login: string;
    password: string;
}

export interface UserDto {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
}
