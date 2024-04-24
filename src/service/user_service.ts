import { ApiResponse } from '../interfaces/api_response'
import { UserResponse } from '../interfaces/user_response'
import { ApiService } from './api_service'

export class UserService extends ApiService<ApiResponse<UserResponse>> {
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
}
