type APISuccess<T> = {
    status: 'success',
    data: T
}

type APIError = {
    status: 'failed',
    message: string
}

type APIResponse<T> = APIError | APISuccess<T>

type UploadingFile = {
    name: string
    dataURL: string
}

type APISort = {
    order: 'asc' | 'desc'
    field: string
}

type APIQuery = {
    per_page: number
    current: number
    s: string
    sort?: APISort
}

type APIParam<T> = {
    total_page: number,
    total: number,
    current: number,
    per_page: number
    data: T
}
// vee-validate.d.ts
// declare module 'vee-validate'