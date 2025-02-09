import * as Yup from 'yup'

export const permissionSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().label('Description'),
})

export const roleSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    description: Yup.string().label('Description'),
    permissions: Yup.array().of(Yup.string()).min(1).required().label('Permission'),
})