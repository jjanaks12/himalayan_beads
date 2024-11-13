import { n as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const index_get = defineEventHandler(async (event) => {
  let res = {
    status: "failed",
    message: ""
  };
  await prisma.permission.findMany().then((pemissions) => {
    res = {
      status: "success",
      data: pemissions
    };
  });
  return res;
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
