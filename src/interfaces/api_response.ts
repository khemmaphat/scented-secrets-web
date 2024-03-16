export interface ApiResponse<T> {
    Status: number
    Message?: string
    total?: number
    Code?: number
    data?: T
    err?: string
}
