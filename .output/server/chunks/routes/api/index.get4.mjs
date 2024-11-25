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
  let res = {
    status: "failed",
    message: ""
  };
  await prisma.role.findMany({
    include: {
      permissions: true
    }
  }).then((roles) => {
    res = {
      status: "success",
      data: roles
    };
  });
  return res;
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
