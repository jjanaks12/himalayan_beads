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

export const userCheckoutSchema = Y.object().shape({
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