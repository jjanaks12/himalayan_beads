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
const country_get = defineEventHandler(async (event) => {
  return await prisma.country.findMany({
    orderBy: {
      name: "asc"
    }
  });
});

export { country_get as default };
//# sourceMappingURL=country.get.mjs.map
