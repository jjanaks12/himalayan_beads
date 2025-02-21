import { d as defineEventHandler } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const dashboard_get = defineEventHandler(async (event) => {
  let res = {
    status: "success",
    data: {
      categories: await prisma.category.count(),
      products: await prisma.product.count()
    }
  };
  return res;
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
