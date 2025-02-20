import * as Y from 'yup'

export const checkoutSchema = Y.object().shape({
    billing_street: Y.string().required().label('Street'),
    billing_address: Y.string().required().label('Address'),
    billing_city: Y.string().required().label('City'),
    billing_state: Y.string().required().label('State'),
    billing_zipcode: Y.string().required().label('Zipcode'),
    billing_country: Y.string().required().label('Country'),

    shipping_street: Y.string().required().label('Street'),
    shipping_address: Y.string().required().label('Address'),
    shipping_city: Y.string().required().label('City'),
    shipping_state: Y.string().required().label('State'),
    shipping_zipcode: Y.string().required().label('Zipcode'),
    shipping_country: Y.string().required().label('Country'),
})