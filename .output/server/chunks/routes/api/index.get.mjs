import { d as defineEventHandler } from '../../runtime.mjs';
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
      predecessor: true
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
