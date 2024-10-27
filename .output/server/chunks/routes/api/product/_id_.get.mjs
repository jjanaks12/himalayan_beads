import { n as defineEventHandler } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const _id__get = defineEventHandler((event) => new Promise(async (resolve, reject) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  let response = {
    status: "failed",
    message: ""
  };
  await prisma.product.findFirst({
    where: { id },
    include: {
      prices: true,
      images: true,
      category: true,
      stock: true
    }
  }).then((product) => {
    if (product)
      resolve({
        status: "success",
        data: product
      });
    else
      reject({
        status: "failed",
        message: "Product could not be found"
      });
  });
  return reject(response);
}));

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
