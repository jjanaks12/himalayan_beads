import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import Bcrypt from 'bcrypt'

import { userLoginSchema, userRegistrationSchema } from '@/app/lib/schema/user.schema'
import { JWT } from '@/app/lib/services/jwt.services'
import { Redis } from '@/app/lib/services/redis.service'

type UserRegistrationRequest = {
    email: string
    password: string
}

type UserLoginRequest = {
    email: string
    password: string
}

const prisma = new PrismaClient()
export class AuthController {
    static JWT_SERVICE = new JWT()

    public static async login(request: Request<{}, {}, UserLoginRequest>, response: Response, next: NextFunction) {
        try {
            const result = await userLoginSchema.validate(request.body, { abortEarly: false })
            console.log(result);

            const userExists = await prisma.user.findUnique({ where: { email: result.email } })

            if (!userExists)
                throw createHttpError.NotFound(`${result.email} has not been registered`)

            const isMatch = await Bcrypt.compare(request.body.password, userExists.password)
            if (!isMatch)
                throw createHttpError.Unauthorized('email / password not valid')

            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(userExists.id)
            const refreshToken = await AuthController.JWT_SERVICE.signRefreshToken(userExists.id)

            response.send({ accessToken, refreshToken })
        } catch (error) {
            if (error.errors && error.errors.length > 0)
                return next(createHttpError.BadRequest('Invalid email / password'))

            next(error)
        }
    }

    public static async register(request: Request<{}, {}, UserRegistrationRequest>, response: Response, next: NextFunction) {
        try {
            const result = await userRegistrationSchema.validate(request.body, { abortEarly: false })
            const userExists = await prisma.user.findUnique({ where: { email: result.email } })
            const role = await prisma.role.findFirst({ where: { name: 'User' } })

            if (userExists)
                throw createHttpError.Conflict(`${result.email} is already been registered`)

            const salt = await Bcrypt.genSalt(10)
            const hashPassword = await Bcrypt.hash(result.password, salt)

            const newUser = await prisma.user.create({
                data: {
                    email: result.email,
                    password: hashPassword,
                    role_id: role.id
                },
                omit: {
                    password: true
                }
            })

            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(newUser.id)
            const refreshToken = await AuthController.JWT_SERVICE.signRefreshToken(newUser.id)

            response.send({ accessToken, refreshToken })
        } catch (error) {
            next(error)
        }
    }

    public static async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.body

            if (!refreshToken)
                throw createHttpError.BadRequest()

            const userId = await AuthController.JWT_SERVICE.verifyRefreshToken(refreshToken)

            await Redis.delete(userId)

            response.sendStatus(204)
        } catch (error) {
            next(error)
        }
    }

    public static async refreshToken(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.body

            if (!refreshToken)
                throw createHttpError.BadRequest()

            const userId = await AuthController.JWT_SERVICE.verifyRefreshToken(refreshToken)
            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(userId)
            const refToken = await AuthController.JWT_SERVICE.signRefreshToken(userId)

            response.send({ accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    }

    public static async profile(request: Request, response: Response, next: NextFunction) {
        try {
            console.log('Test::::',request.body);
            
            response.send(await prisma.user.findFirstOrThrow({
                where: {
                    id: request.body.auth_user.id
                },
                omit: {
                    password: true
                },
                include: {
                    role: {
                        include: {
                            permissions: true
                        }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}