type APISuccess<T> = {
    status: 'success',
    data: T | string
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
// vee-validate.d.ts
// declare module 'vee-validate'