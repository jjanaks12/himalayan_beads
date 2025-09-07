import { companySchema } from "@/app/lib/schema/account.schema"
import { FileHandler } from "@/lib/services/File.service"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class CompanyController {
    public static async get(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.company.findFirst({
                include: {
                    address: {
                        include: {
                            country: true
                        }
                    },
                    logo: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}

            const validationData = await companySchema.validate(request.body, { abortEarly: false })
            const address = await prisma.address.create({
                data: {
                    address: validationData.address.address,
                    street: validationData.address.street,
                    state: validationData.address.state,
                    city: validationData.address.city,
                    zipCode: validationData.address.zipCode,
                    countryId: validationData.address.countryId,
                    type: 'PERMANENT_ADDRESS'
                }
            })
            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, request.body.image_id)
                body.image_id = image.id
            }

            response.send(await prisma.company.create({
                data: {
                    name: validationData.name,
                    email: validationData.email,
                    address_id: address.id,
                    phone: validationData.phone,
                    vat_no: validationData.vat_no,
                    pan_no: validationData.pan_no,
                    vat_registered: validationData.vat_registered,
                    ...body
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}
            const validationData = await companySchema.validate(request.body, { abortEarly: false })
            const company = await prisma.company.findFirst({ where: { id: request.params.id } })

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, company.image_id)
                body.image_id = image.id
            }

            if (company.address_id)
                await prisma.address.update({
                    where: {
                        id: company.address_id
                    },
                    data: {
                        address: validationData.address.address,
                        street: validationData.address.street,
                        state: validationData.address.state,
                        city: validationData.address.city,
                        zipCode: validationData.address.zipCode,
                        countryId: validationData.address.countryId,
                    }
                })
            else {
                const address = await prisma.address.create({
                    data: {
                        address: validationData.address.address,
                        street: validationData.address.street,
                        state: validationData.address.state,
                        city: validationData.address.city,
                        zipCode: validationData.address.zipCode,
                        countryId: validationData.address.countryId,
                        type: 'PERMANENT_ADDRESS'
                    }
                })
                body.address_id = address.id
            }

            response.send(await prisma.company.update({
                where: {
                    id: company.id
                },
                data: {
                    name: validationData.name ?? company.name,
                    email: validationData.email ?? company.email,
                    phone: validationData.phone ?? company.phone,
                    vat_no: validationData.vat_no ?? company.vat_no,
                    pan_no: validationData.pan_no ?? company.pan_no,
                    vat_registered: validationData.vat_registered ?? company.vat_registered,
                    ...body
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}