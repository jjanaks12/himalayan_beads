import * as Y from 'yup'

export const productSchema = Y.object().shape({
    name: Y.string().required().label('Name'),
    category_id: Y.string().required().label('Category'),
})

export const productImageSchema = Y.object().shape({
    images: Y.array().of(Y.string().required())
})

export const productStockSchema = Y.object({
    quantity: Y.number().required().label('Quantity')
})

export const productPriceSchema = Y.object({
    id: Y.string().label("Price ID"),
    amount: Y.number().required().label('Amount')
})