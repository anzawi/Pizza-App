export interface User {
    id: string
    name: string
    email: string
    token: string | null
}

export interface UserFormValues {
    email: string
    password: string
}

export interface UserRegisterFormValues {
    email: string
    password: string
    username: string
}
