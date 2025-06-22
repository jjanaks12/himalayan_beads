import * as Y from 'yup'

export const loginSchema = Y.object({
    email: Y.string().required().email().label('Email'),
    password: Y.string().required().label('Password'),
    remember_me: Y.boolean(),
})

export const registerSchema = Y.object({
    first_name: Y.string().required().label('First name'),
    last_name: Y.string().required().label('Last name'),
    email: Y.string().required().email().label('Email'),
    password: Y.string().min(6).required().label('Password'),
    confirm_password: Y.string().required().oneOf([Y.ref('password')], 'Passwords must match'),
})