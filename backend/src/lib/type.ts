export type APISort = {
    order: 'asc' | 'desc'
    field: string
}

export type APIQuery = {
    per_page: number
    current: number
    s: string
    sort?: APISort
    filter: Record<string, string>
}