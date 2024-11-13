import { o as defineEventHandler, r as readBody } from '../../../../runtime.mjs';
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
const index_post = defineEventHandler(async (event) => {
  var _a;
  const product_id = (_a = event.context.params) == null ? void 0 : _a.id;
  const data = await readBody(event);
  let response = {
    status: "failed",
    message: ""
  };
  const price = await prisma.price.create({
    data: {
      amount: data.amount,
      parent_id: data.parent_id
    }
  });
  await prisma.priceOnProduct.create({
    data: {
      price_id: price.id,
      product_id
    }
  });
  response = {
    status: "success",
    data: price
  };
  return response;
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
