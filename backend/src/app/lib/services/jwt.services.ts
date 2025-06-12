import createHttpError from 'http-errors'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

import { Redis } from './redis.service'

export class JWT {
    public signAccessToken(userId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options: SignOptions = {
                expiresIn: '1h',
                issuer: process.env.APP_NAME,
                audience: userId
            }

            jwt.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createHttpError.InternalServerError())
                }

                return resolve(token)
            })
        })
    }

    public signRefreshToken(userId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET
            const options: SignOptions = {
                expiresIn: '0.5y',
                issuer: process.env.APP_NAME,
                audience: userId
            }

            jwt.sign(payload, secret, options, async (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createHttpError.InternalServerError())
                }

                await Redis.set(userId, token, 0.5 * 365 * 24 * 60 * 60)
                return resolve(token)
            })
        })
    }

    public verifyRefreshToken(refreshToken: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, payload: JwtPayload) => {
                if (error) {
                    reject(createHttpError.Unauthorized())
                    return
                }

                const userId = payload.aud as string
                const result = await Redis.get(userId)

                if (refreshToken === result)
                    resolve(userId)

                reject(createHttpError.Unauthorized())
            })
        })
    }
}