import * as Icons from 'lucide-vue-next'

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
    // id: number
    title: string
    name: string
    path: string
    icon: keyof typeof Icons
    permission: string | string[]
    role?: string
    sub_menu?: Menu[]
    parent_id?: number
}

type DashboardDetail = {
    [props: string]: number
}

interface CartItem<T> {
    product: T
    quantity: number
}

type FullProduct = Product & {
    prices: Price[]
    category: Category
    images: Image[]
    stock: Stock
}

type ProductWithRate = Product & {
    rate: Price
}

type OrderWithShippingAddress = Order & {
    shippingAddress: Address & {
        country: Country
    }
}

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`
type ThemeColor = 'primary' | 'secondary' | 'danger' | 'success' | 'info'
type Color = RGB | RGBA | HEX | ThemeColor

type Permission = {
    id: string
    name: string
}

type Role = {
    id: string
    name: string
    permissions: Permission[]
}

type User = {
    id: string
    first_name?: string
    last_name?: string
    email: string
    role_id: string
    image_id?: string
    emailVerified?: string
    deletedAt?: string
    createdAt: string
    updatedAt: string

    role: Role
    image?: Image
    accounts: Account[]
    orders: Order[]
}

type Image = {
    id: string
    name: string
    url?: string
}

type Token = {
    accessToken: string
    refreshToken: string
}