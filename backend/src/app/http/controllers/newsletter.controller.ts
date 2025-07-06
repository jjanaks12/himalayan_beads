import { newsleterSchema } from "@/app/lib/schema/newsletter.schema"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class NewsletterController {
    public static async save(request: Request, response: Response, next: NextFunction) {
        try {
            const validatedData = await newsleterSchema.validate(request.body, { abortEarly: false })

            const user = await prisma.user.findFirst({
                where: {
                    email: validatedData.email
                }
            })

            response.send(await prisma.newsletter.create({
                data: {
                    email: validatedData.email,
                    user_id: user ? user.id : null
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}