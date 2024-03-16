import axios from 'axios'

export abstract class ApiService<T> {
    private baseUrl = import.meta.env.VITE_SCENTED_SECRETS_API
    protected readonly httpOptions:
        | { headers: { [key: string]: string } }
        | undefined

    async getAll(endpoint: string): Promise<T[]> {
        const response = await axios.get(this.baseUrl + endpoint)
        return response.data
    }

    async get(endpoint: string): Promise<T> {
        const response = await axios.get(this.baseUrl + endpoint)
        return response.data
    }

    async patch(endpoint: string, data: object): Promise<T> {
        const response = await axios.patch(this.baseUrl + endpoint, data)
        return response.data
    }
}
