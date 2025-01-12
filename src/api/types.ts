export interface SignUpDto {
    email: string;
    first_name: string;
    login: string;
    password: string;
    phone: string;
    second_name: string;
}

export interface SignInDto {
    login: string;
    password: string;
}

export interface UserInfoDto {
    avatar: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    second_name: string;
}
