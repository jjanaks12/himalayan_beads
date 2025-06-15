import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
export const verifyAccessToken = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers['authorization'])
        return next(createHttpError.Unauthorized())

    const token = request.headers['authorization'].split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if (error) {
            return next(createHttpError.Unauthorized(error.name === 'JsonWebTokenError' ? '' : error.message))
        }

        if (typeof payload != 'string') {
            const user = await prisma.user.findFirstOrThrow({
                where: { id: payload.aud as string }, omit: {
                    password: true
                }
            })
            request.body = { ...request.body, auth_user: user }
        }
        next()
    })
}