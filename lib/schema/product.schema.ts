import * as Yup from 'yup'

export const productSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    category_id: Yup.string().required().label('Category'),
})

export const productPriceSchema = Yup.object().shape({
    amount: Yup.number().required().label('Amount'),
    product_id: Yup.string().required().label('Product')
})