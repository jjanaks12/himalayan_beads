import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express-serve-static-core"

const prisma = new PrismaClient()
export class UserController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await prisma.user.findMany({
                omit: {
                    password: true
                }
            })
            
            response.send(users)
        } catch (error) {
            next(error)
        }
    }
}