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
const index_get = defineEventHandler(async (event) => {
  let response = {
    status: "success",
    data: []
  };
  await prisma.category.findMany({
    where: {
      deletedAt: null,
      parent_id: null
    },
    include: {
      predecessor: true,
      image: true,
      _count: true
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
//# sourceMappingURL=index.get.mjs.map
