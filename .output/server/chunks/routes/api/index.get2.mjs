import { d as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import { a as authCheck } from '../../_/authCheck.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import '../../_/nuxtAuthHandler.mjs';
import 'next-auth/core';

const prisma = new PrismaClient();
const index_get = defineEventHandler({
  onRequest: [authCheck],
  handler: async () => {
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
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
