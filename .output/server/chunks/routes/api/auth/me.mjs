import { d as defineEventHandler, r as readBody } from '../../../runtime.mjs';
import { PrismaClient, Prisma } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
Prisma.validator()({
  omit: {
    password: false
  },
  include: {
    role: {
      include: {
        permissions: true
      }
    }
  }
});
const me = defineEventHandler(async (event) => {
  let response = {
    status: "failed",
    message: ""
  };
  const { email } = await readBody(event);
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      role: {
        include: {
          permissions: true
        }
      }
    }
  });
  if (user) {
    const { password, ...withoutPassword } = user;
    response = {
      status: "success",
      data: withoutPassword
    };
  }
  return response;
});

export { me as default };
//# sourceMappingURL=me.mjs.map
