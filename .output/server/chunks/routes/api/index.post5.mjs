import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const index_post = defineEventHandler(async (event) => {
  const { id, name, description, permissions } = await readBody(event);
  let res = {
    status: "failed",
    message: ""
  };
  if (id) {
    let diff = [];
    const permissionList = await prisma.role.findUnique({ where: { id } }).permissions();
    if (permissionList != null) {
      const permissionListOfId = permissionList.map((permission) => permission.id);
      diff = permissionListOfId.filter((permissionId) => !permissions.includes(permissionId));
    }
    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions: {
          connect: permissions.map((permission_id) => ({ id: permission_id })),
          disconnect: diff.map((permission_id) => ({ id: permission_id }))
        }
      }
    });
    res = {
      status: "success",
      data: role
    };
  } else {
    const role = await prisma.role.create({
      data: {
        name,
        description,
        publish: true,
        permissions: {
          connect: permissions.map((permission_id) => ({ id: permission_id }))
        }
      }
    });
    res = {
      status: "success",
      data: role
    };
  }
  return res;
});

export { index_post as default };
//# sourceMappingURL=index.post5.mjs.map
