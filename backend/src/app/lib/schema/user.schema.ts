import * as Y from 'yup'

export const userRegistrationSchema = Y.object().shape({
    email: Y.string().email().required(),
    password: Y.string().required().min(6)
})

export const userLoginSchema = Y.object().shape({
    email: Y.string().email().required(),
    password: Y.string().required().min(6)
})