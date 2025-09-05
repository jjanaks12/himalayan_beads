import * as Y from 'yup'

export const companySchema = Y.object({
    name: Y.string().required().label('Company name'),
    email: Y.string().email().required().label('Email'),
    address: Y.object({
        street: Y.string().required().label('Street name'),
        address: Y.string().required().label('Address name'),
        city: Y.string().required().label('City'),
        state: Y.string().required().label('State'),
        zipCode: Y.string().required().label('ZipCode'),
        countryId: Y.string().required().label('Country'),
    }).required().label('Address'),
    phone: Y.string().required().label('Phone number'),
    vat_registered: Y.boolean().required().label('Is company registered on VAT'),
    pan_no: Y.string().when('vat_registered', {
        is: false || undefined,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired()
    }).label('PAN number'),
    vat_no: Y.string().when('vat_registered', {
        is: true,
        then: schema => schema.required(),
        otherwise: schema => schema.notRequired()
    }).label('VAT number'),
    image: Y.string().label('Company logo'),
})