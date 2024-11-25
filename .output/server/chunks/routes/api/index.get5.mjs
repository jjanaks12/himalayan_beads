import { o as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
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
const index_get = defineEventHandler(async (event) => {
  let res = {};
  await prisma.user.findMany({
    omit: {
      password: true
    },
    include: {
      image: true,
      role: true
    }
  }).then((users) => {
    res = {
      status: "success",
      data: users
    };
  });
  return res;
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
