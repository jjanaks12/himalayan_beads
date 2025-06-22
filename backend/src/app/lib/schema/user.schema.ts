import * as Y from 'yup'

export const userRegistrationSchema = Y.object().shape({
    first_name: Y.string().required().label('First name'),
    last_name: Y.string().required().label('Last name'),
    email: Y.string().required().email().label('Email'),
    password: Y.string().min(6).required().label('Password'),
})

export const userLoginSchema = Y.object().shape({
    email: Y.string().email().required(),
    password: Y.string().required().min(6)
})