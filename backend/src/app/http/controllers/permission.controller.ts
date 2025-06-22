import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class PermissionController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.permission.findMany({
                where: {
                    deletedAt: null
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {

            response.send()
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {

            response.send()
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {

            response.send()
        } catch (error) {
            next(error)
        }
    }
}