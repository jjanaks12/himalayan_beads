import * as Icons from "lucide-vue-next"

export type OrderStatus = 'NEW' | 'PENDING' | 'CANCELLED' | 'PROCESSING' | 'COMPLETED' | 'DELETED'

type OrderType = 'CASH_ON_DELIVERY' | 'ONLINE' | 'PAID'

type AddressType = 'BILLING' | 'SHIPPING'

type APISuccess<T> = {
  status: "success"
  data: T
}

type APIError = {
  status: "failed"
  message: string
}

type APIResponse<T> = APIError | APISuccess<T>

type UploadingFile = {
  name: string
  dataURL: string
}

type APISort<T> = {
  order: "asc" | "desc"
  field: keyof typeof T
}

type APIQuery<T> = {
  s: string
  sort?: APISort<T>
}

type APIParam = {
  total_page: number
  total: number
  current: number
  per_page: number
}

type APIRequest<T> = APIParam & {
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
  quantity: number,
  price: Price
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

type Country = {
  id: string
  name: string
  abbr: string
  code: string

  addresses: Address[]
}

type Address = {
  id: string
  street: string
  address: string
  city: string
  state: string
  zipCode: string
  countryId: string
  country: Country
  type: AddressType
  orders: Order[]
}

type OrderWithShippingAddress = Order & {
  shippingAddress: Address & {
    country: Country
  }
}

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`
type ThemeColor = "primary" | "secondary" | "danger" | "success" | "info"
type Color = RGB | RGBA | HEX | ThemeColor

type Permission = {
  id: string
  name: string
}

type Role = {
  id: string
  name: string
  description: string
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
  billingAddress?: Address
  shippingAddress?: Address
  accounts: Account[]
  orders: Order[]
}

type CartItem = {
  price_id: string
  product_id: string
  quantity: number
}

type Order = {
  id: string
  status: OrderStatus
  type: OrderType
  userId: string
  detail: CartItem[]
  billingAddressId: string
  shippingAddressId: string
  createdAt: string
  updatedAt: string
  user: User
  shippingAddress: Address
  billingAddress: Address
  products: Product[]
  prices: Price[]
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

type NavItem = {
  name: string
  to: RouteLocationRaw
}

interface Product {
  id: string
  name: string
  description: string
  image: string
  category_id: string
  deletedAt?: string
  createdAt: string
  updatedAt: string
  category: Category
  prices: Price[]
  stock: Stock
  images: ImageOnProduct[]
  orders: Order[]
  _count: {
    orders: number
  }
}

interface Price {
  id: string
  amount: number
  parent_id: string
  products: Product[]
  successor: Price
  predecessor: Price[]
}

interface Stock {
  id: string
  quantity: number
  product_id: string
  product: Product
}

interface ImageOnProduct {
  id: string
  product_id: string
  image_id: string
  featured: boolean
  products: Product[]
  image: Image
}

interface Category {
  id: string
  slug: string
  name: string
  parent_id?: string
  image_id?: string
  description?: string
  deletedAt?: string
  createdAt: string
  updatedAt: string
  image?: Image
  successor?: Category
  predecessor: Category[]
  products: Product[]
}

// Defines the shape of a banner item from your grid
interface Banner {
  id: number
  type: "banner"
  title: string
  subtitle: string
  image: string
}
interface CartItem<T> {
  // <-- SOLUTION: It now correctly takes only one argument
  product: T
  quantity: number
}

interface BlogPost {
  id: number
  image: string
  category: string
  timeAgo: string
  title: string
  description: string
  slug: string // The unique identifier for the URL
}