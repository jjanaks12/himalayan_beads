import { roleSchema } from "@/app/lib/schema/role.schema"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

const prisma = new PrismaClient()
export class RoleController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.role.findMany({
                where: {
                    deletedAt: null
                },
                include: {
                    permissions: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await roleSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.role.create({
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    publish: true,
                    permissions: {
                        connect: validationData.permissions.map(permission_id => ({ id: permission_id }))
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.role_id
            const validationData = await roleSchema.validate(request.body, { abortEarly: false })

            const role = await prisma.role.findFirstOrThrow({
                where: { id },
                include: {
                    permissions: true
                }
            })

            const permissionsArrayList = role.permissions.map(permission => permission.id)
            const idsTobeRemoved = permissionsArrayList.filter(permission_id => !validationData.permissions.includes(permission_id))
                .map(permission_id => ({ id: permission_id }))
            const idsNotOnlist = validationData.permissions.filter(permission_id => !permissionsArrayList.includes(permission_id))
                .map(permission_id => ({ id: permission_id }))

            response.send(await prisma.role.update({
                where: { id },
                data: {
                    name: validationData.name,
                    description: validationData.description || role.description,
                    updatedAt: moment().toISOString(),
                    permissions: {
                        connect: idsNotOnlist,
                        disconnect: idsTobeRemoved
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.role_id

            response.send(await prisma.role.update({
                where: { id },
                data: {
                    updatedAt: moment().toISOString(),
                    publish: false,
                    deletedAt: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}