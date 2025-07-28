import * as Y from 'yup'

export const userLoginSchema = Y.object({
    email: Y.string().email().required(),
    password: Y.string().required(),
    remember_me: Y.boolean()
})

export const userRegisterSchema = Y.object({
    email: Y.string().email().required(),
    password: Y.string().min(6).required(),
    confirm_password: Y.string().required().oneOf([Y.ref('password')], 'Password do not match')
})

export const userChangePasswordSchema = Y.object({
    old_password: Y.string().min(6).required(),
    password: Y.string().min(6).required(),
    confirm_password: Y.string().required().oneOf([Y.ref('password')], 'Password do not match')
})

export const userDetailSchema = Y.object({
    first_name: Y.string().required().label('First name'),
    middle_name: Y.string().label('Middle name'),
    last_name: Y.string().required().label('Last name'),
    email: Y.string().label('Email'),
    date_of_birth: Y.string().label('Date of birth'),
    gender_id: Y.string().label('Gender'),
    phone_number: Y.string().label('Phone number'),
    country_id: Y.string().label('Country'),
    age_catgory_id: Y.string().label('Age catgory'),
    size_id: Y.string().label('Size'),
    image: Y.string().label('Image'),
})

export const userCheckoutInfo = Y.object({
    same_as_billing: Y.boolean().default(false).label('Same as billing'),
    payment: Y.object({
        cash_on_delivery: Y.boolean().required().label('Name on card'),
        name_on_card: Y.string().when('cash_on_delivery', ([value], schema) => {
            if (value) schema.required()
            return schema
        }).label('Name on card'),
        card_number: Y.string().length(16).when('cash_on_delivery', ([value], schema) => {
            if (value) schema.required()
            return schema
        }).label('Number on card'),
        month: Y.number().when('cash_on_delivery', ([value], schema) => {
            if (value) schema.required()
            return schema
        }).label('Expiry month on card'),
        year: Y.number().when('cash_on_delivery', ([value], schema) => {
            if (value) schema.required()
            return schema
        }).label('Expiry year on card'),
        card_cvc: Y.string().min(3).max(4).when('cash_on_delivery', ([value], schema) => {
            if (value) schema.required()
            return schema
        }).label('CVC'),
    }).required(),
    billing_address: Y.object({
        street: Y.string().required().label('Street name'),
        address: Y.string().required().label('Address name'),
        city: Y.string().required().label('City'),
        state: Y.string().required().label('State'),
        zipCode: Y.string().required().label('ZipCode'),
        countryId: Y.string().required().label('Country'),
    }),
    shipping_address: Y.object({
        street: Y.string().required().label('Street name'),
        address: Y.string().required().label('Address name'),
        city: Y.string().required().label('City'),
        state: Y.string().required().label('State'),
        zipCode: Y.string().required().label('ZipCode'),
        countryId: Y.string().required().label('Country'),
    }),
    cartItems: Y.array().of(Y.object({
        product_id: Y.string().required().label('Product'),
        quantity: Y.number().required().label('Quantity'),
        price_id: Y.string().required().label('Price')
    })).required()
})