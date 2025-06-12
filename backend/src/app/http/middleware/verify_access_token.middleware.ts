import { NextFunction, Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

export const verifyAccessToken = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers['authorization'])
        return next(createHttpError.Unauthorized())

    const token = request.headers['authorization'].split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if (error) {
            return next(createHttpError.Unauthorized(error.name === 'JsonWebTokenError' ? '' : error.message))
        }

        request.body = { ...request.body, payload }
        next()
    })
}