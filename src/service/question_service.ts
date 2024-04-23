import { ApiResponseDataArray, ApiResponse } from '../interfaces/api_response'
import { QuestionResultResponse } from '../interfaces/question_interface'
import { ApiService } from './api_service'

export class QuestionServiceArray extends ApiService<ApiResponseDataArray> {
    public async getQuestions(): Promise<ApiResponseDataArray> {
        return this.get(`/api/question`)
    }
}

export class QuestionService extends ApiService<
    ApiResponse<QuestionResultResponse>
> {
    public async getResultQuestion(
        answered: string
    ): Promise<ApiResponse<QuestionResultResponse>> {
        return this.get(`/api/resultquestion?answered=${answered}`)
    }
}
