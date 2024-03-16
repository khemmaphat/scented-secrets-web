export interface SignIn_Res {
    id?: string
    message?: string
    error?: string
}

export interface SignIn_Req {
    username: string
    password: string
}

export interface SignUp_Req {
    email: string
    username: string
    password: string
}

export interface SignUp_Res {
    message?: string
    error?: string
}

export interface Profile_User {
    username?: string
    firstname?: string
    lastname?: string
    telephone?: string
    description?: string
    birthday?: Date
}
