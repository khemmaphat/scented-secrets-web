import { ApiResponse } from '../interfaces/api_response'
import {
    SignIn_Req,
    SignIn_Res,
    SignUp_Req,
    UserResponse,
} from '../interfaces/user_interface'
import { ApiService } from './api_service'

export class UserService extends ApiService<ApiResponse<any>> {
    public getUserById(id: string | null): Promise<ApiResponse<UserResponse>> {
        return this.get(`/api/user?id=${id}`)
    }

    public async updateUser(
        id: string | null,
        updatedData: UserResponse | undefined
    ): Promise<ApiResponse<UserResponse>> {
        if (!updatedData) {
            throw new Error('Updated data is undefined')
        }

        return this.patch(`/api/edituser?id=${id}`, updatedData)
    }

    public async updateNameUser(id: string | null, name: string | null) {
        return this.patchNoBody(`/api/name?id=${id}&name=${name}`)
    }

    public async signInUser(
        loginData: SignIn_Req
    ): Promise<ApiResponse<SignIn_Res>> {
        return this.post(`/api/login`, loginData)
    }

    public async signUpUser(
        signUpUser: SignUp_Req
    ): Promise<ApiResponse<SignUp_Req>> {
        return this.post(`/api/user`, signUpUser)
    }
}
