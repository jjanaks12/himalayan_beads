import * as Yup from 'yup'

export const productSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().required().label('Description'),
    category_id: Yup.string().required().label('Category'),
})