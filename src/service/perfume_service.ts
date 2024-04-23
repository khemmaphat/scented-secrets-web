import {
    AvgScoreCommment,
    PerfumeDataDetail,
    PerfumeMixedResult,
    SearchRequest,
} from '../interfaces/perfume_interface'
import { ApiService } from './api_service'
import { ApiResponseDataArray, ApiResponse } from '../interfaces/api_response'

export class PerfumeServiceArray extends ApiService<ApiResponseDataArray> {
    public async getSearchPerfumeData(
        search: SearchRequest | undefined
    ): Promise<ApiResponseDataArray> {
        if (!search) {
            throw new Error('Updated data is undefined')
        }
        return this.post(`/api/searchperfume`, search)
    }

    public async getAllGroupNote(): Promise<ApiResponseDataArray> {
        return this.get(`/api/getallgroupnote`)
    }

    public async getPerfumePath(): Promise<ApiResponseDataArray> {
        return this.get(`/api/perfumepath`)
    }
}

export class PerfumeService extends ApiService<ApiResponse<any>> {
    public async getPerfumeDetail(
        id: string | ''
    ): Promise<ApiResponse<PerfumeDataDetail>> {
        if (!id) {
            throw new Error('id is require')
        }
        return this.get(`/api/perfume?id=${id}`)
    }

    public async getResultMixedPerfume(
        answered: string
    ): Promise<ApiResponse<PerfumeMixedResult>> {
        return this.get(`/api/resultmixed?answered=${answered}`)
    }

    public async getPerfumeComment(
        perfumeId: string
    ): Promise<ApiResponse<AvgScoreCommment>> {
        return this.get(`/api/comment?perfumeId=${perfumeId}`)
    }
}
