import { n as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const index_post = defineEventHandler(async (event) => {
  const data = await readBody(event);
  let response = {
    status: "failed",
    message: ""
  };
  if (data.id) {
    const id = data.id;
    delete data.id;
    await prisma.product.findFirst({ where: { id } }).then(async () => {
      await prisma.product.update({
        where: { id },
        data: {
          ...data
        }
      }).then((product) => {
        response = {
          status: "success",
          data: product
        };
      }).catch(() => {
        response = {
          status: "failed",
          message: `Cannot save ${data.name}`
        };
      });
    }).catch(() => {
      response = {
        status: "failed",
        message: "Cannot find the record"
      };
    });
  } else {
    await prisma.product.create({
      data
    }).then((product) => {
      response = {
        status: "success",
        data: product
      };
    }).catch(() => {
      response = {
        status: "failed",
        message: "Something wrong with the database"
      };
    });
  }
  return response;
});

export { index_post as default };
//# sourceMappingURL=index.post4.mjs.map
