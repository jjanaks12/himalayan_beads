import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let response: APIResponse<User> = {
    status: 'failed',
    message: ''
  }
  const { email } = await readBody(event)

  const user: any = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const { password, ...withoutPassword } = user
  
  response = {
    status: 'success',
    data: withoutPassword
  }

  return response
})
