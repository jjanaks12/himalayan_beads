import { type H3Event } from 'h3'
import { getServerSession } from '#auth'

const authCheck = async (event: H3Event) => {
    const session = await getServerSession(event)

    if (!session)
        throw createError({
            statusMessage: 'Unauthenticated',
            statusCode: 403
        })
}

export default authCheck