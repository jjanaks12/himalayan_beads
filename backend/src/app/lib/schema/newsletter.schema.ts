import * as Y from 'yup'

export const newsleterSchema = Y.object({
    email: Y.string().required().email().label('Email'),
    first_name: Y.string().label('First name')
})