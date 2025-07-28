import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient()
export class MiscellanousController {
    public static async getCountries(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.country.findMany())
        } catch (error) {
            next(error)
        }
    }
}