import { PrismaClient } from "@prisma/client"
import bcript from 'bcrypt'
import { type H3Event } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async (event: H3Event) => {
    const { email, password } = await readBody(event)
    let res: any = {}

    const hash = bcript.hashSync(password, 10)

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    let userRole = await prisma.role.findFirst({
        where: {
            name: 'user'
        }
    })

    if (!userRole)
        throw createError({
            statusCode: 400,
            statusMessage: 'User role not found'
        })

    if (user)
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists'
        })
    else {
        await prisma.user.create({
            data: {
                email: email,
                password: hash,
                role: {
                    connect: userRole
                }
            }
        })
            .then((user) => {
                setResponseStatus(event, 200)

                res = {
                    status: 'success',
                    response: user
                }
            })
            .catch(() => {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'something went wrong'
                })
            })

    }
    return res
})