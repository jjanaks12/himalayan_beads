import * as Yup from 'yup'

export const categorySchema = Yup.object({
    name: Yup.string().required().label('Name'),
    description: Yup.string().label('Description')
})