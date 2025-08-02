import * as Y from 'yup'

export const roleSchema = Y.object({
    name: Y.string().required().label('Name'),
    description: Y.string().label('Description'),
    permissions: Y.array().of(Y.string()).min(1).required().label('permissions')
})