import * as Yup from 'yup'

export const permissionSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().required().label('Description'),
})

export const roleSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().required().label('Description'),
})