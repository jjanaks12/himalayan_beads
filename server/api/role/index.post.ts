import { PrismaClient, Permission } from '@prisma/client'
import type { H3Event } from 'h3'

import { APIResponse } from '~/himalayan_beads'

const prisma = new PrismaClient()
export default defineEventHandler(async (event: H3Event) => {
  const { id, name, description, permissions } = await readBody(event)
  let res: APIResponse<any> = {
    status: 'failed',
    message: ''
  }

  if (id) {
    let diff: string[] = []
    const permissionList = await prisma.role.findUnique({ where: { id } }).permissions()
    if (permissionList != null) {
      const permissionListOfId = permissionList.map((permission: Permission) => permission.id)
      diff = permissionListOfId.filter(permissionId => !permissions.includes(permissionId))
    }

    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions: {
          connect: permissions.map((permission_id: string) => ({ id: permission_id })),
          disconnect: diff.map((permission_id: string) => ({ id: permission_id })),
        }
      }
    })

    res = {
      status: 'success',
      data: role
    }
  } else {
    const role = await prisma.role.create({
      data: {
        name,
        description,
        publish: true,
        permissions: {
          connect: permissions.map((permission_id: string) => ({ id: permission_id }))
        }
      }
    })

    res = {
      status: 'success',
      data: role
    }
  }

  return res
})
