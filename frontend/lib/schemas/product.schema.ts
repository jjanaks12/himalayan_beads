import * as Y from 'yup'

export const productCreateSchema = Y.object({
    id: Y.string().label("Product ID"),
    name: Y.string().required().label("Product name"),
    category_id: Y.string().required().label("Category")
})

export const categoryCreateSchema = Y.object({
    id: Y.string().label("Category ID"),
    name: Y.string().required().label('Category name'),
    type: Y.string().oneOf(['BLOG', 'PRODUCT']).required().label('Category type'),
    descripiton: Y.string().label("Product description")
})

export const productStockSchema = Y.object({
    quantity: Y.number().required().label('Quantity')
})

export const productPriceSchema = Y.object({
    id: Y.string().label("Price ID"),
    amount: Y.number().required().label('Amount')
})