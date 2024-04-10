import { ApiResponseDataArray } from '../interfaces/api_response'
import { ApiService } from './api_service'

export class QuestionServiceArray extends ApiService<ApiResponseDataArray> {
    public async getQuestions(): Promise<ApiResponseDataArray> {
        return this.get(`/api/question`)
    }
}
