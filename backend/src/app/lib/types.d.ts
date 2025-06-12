export type APIError = {
    [propName: string]: string[]
}

export type APISuccessResponse<T> = {
    status: 'success'
    data: T | null
}

export type APIErrorResponse = {
    status: 'failed'
    message: string
    errors?: APIError
}

export type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse

export interface QueryParams {}