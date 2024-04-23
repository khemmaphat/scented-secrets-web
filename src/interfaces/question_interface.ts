import { Notes } from './perfume_interface'

export interface QuestionResponse {
    name: string
    choice: string[]
}

export interface QuestionResultResponse {
    perfumeId: string
    name: string
    brand: string
    notes: Notes
    description: string
    imgUrl: string
}
