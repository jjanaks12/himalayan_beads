import { n as defineEventHandler } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const index_get = defineEventHandler((event) => new Promise(async (resolve, reject) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  let response = {
    status: "failed",
    message: ""
  };
  await prisma.product.findFirst({
    where: { id },
    include: {
      prices: {
        include: {
          price: true
        }
      },
      images: {
        include: {
          images: true
        }
      },
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

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
