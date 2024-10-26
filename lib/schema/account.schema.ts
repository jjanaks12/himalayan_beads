import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().label('Password'),
})

export const registerSchema = Yup.object().shape({
    email: Yup.string().required().label('Email'),
    password: Yup.string().required().label('Password'),
    password_confirmation: Yup.string().required().oneOf([Yup.ref('password')], 'Password do not match').label('Confirm password'),
})