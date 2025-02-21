import * as Icons from '@mdi/js'
import type { Address, Category, Country, Image, Order, Price, Stock } from '@prisma/client'

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

declare global {
    namespace PrismaJson {
        type JSONOrderDetail = {
            detail: {
                product_id: string
                quantity: number
                price_id: string
            }[]
        }
    }
}