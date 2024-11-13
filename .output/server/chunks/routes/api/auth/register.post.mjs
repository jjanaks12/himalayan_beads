import { o as defineEventHandler, r as readBody, f as createError, q as setResponseStatus } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import bcript from 'bcrypt';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'requrl';

const prisma = new PrismaClient();
const register_post = defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  let res = {};
  const hash = bcript.hashSync(password, 10);
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  let userRole = await prisma.role.findFirst({
    where: {
      name: "user"
    }
  });
  if (!userRole)
    throw createError({
      statusCode: 400,
      statusMessage: "User role not found"
    });
  if (user)
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists"
    });
  else {
    await prisma.user.create({
      data: {
        email,
        password: hash,
        role: {
          connect: userRole
        }
      }
    }).then((user2) => {
      setResponseStatus(event, 200);
      res = {
        status: "success",
        response: user2
      };
    }).catch(() => {
      throw createError({
        statusCode: 400,
        statusMessage: "something went wrong"
      });
    });
  }
  return res;
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
