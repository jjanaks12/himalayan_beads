import * as Icons from '@mdi/js'

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

type Menu = {
    id: number
    title: string
    name: string
    path: string
    icon: keyof typeof Icons
    permission: string
    sub_menu?: Menu[]
    parent_id?: number
}

type DashboardDetail = {
    [props: string]: number
}

interface CartItem {
    product: any
    quantity: number
}