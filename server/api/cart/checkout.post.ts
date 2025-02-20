import { PrismaClient } from '@prisma/client'
import { type H3Event } from 'h3'

import authCheck from '~/lib/middleware/authCheck'

const prisma = new PrismaClient()
export default defineEventHandler({
  onRequest: [authCheck],
  handler: async (event: H3Event) => {
    const { user } = await requireUserSession(event)
    const body = await readBody(event)

    return body
  }
})
