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
  let response = {
    status: "success",
    data: []
  };
  await prisma.product.findMany({
    where: {
      deletedAt: null
    },
    include: {
      category: true,
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
      stock: true
    }
  }).then((data) => {
    response = {
      status: "success",
      data
    };
  }).catch(() => {
    response = {
      status: "failed",
      message: "Something wrong with the database"
    };
  });
  return response;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
