import { o as defineEventHandler } from '../../../../runtime.mjs';
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
  var _a;
  const product_id = (_a = event.context.params) == null ? void 0 : _a.id;
  let response = {
    status: "failed",
    message: ""
  };
  const product = await prisma.product.findMany({
    where: {
      id: product_id
    },
    include: {
      prices: true
    }
  });
  response = {
    status: "success",
    data: product.prices
  };
  return response;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
