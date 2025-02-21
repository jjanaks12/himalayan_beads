import { d as defineEventHandler, h as getQuery } from '../../runtime.mjs';
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
    status: "failed",
    message: ""
  };
  const { per_page = 10, current = 1, s = "", sort } = getQuery(event);
  const skip = (current - 1) * per_page;
  await prisma.product.findMany({
    skip,
    take: parseInt(per_page.toString()),
    where: {
      deletedAt: null,
      id: { contains: s },
      name: { contains: s }
    },
    orderBy: [{ createdAt: "desc" }],
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
  }).then(async (data) => {
    const total = await prisma.product.count();
    response = {
      status: "success",
      data: {
        total,
        total_page: Math.ceil(total / per_page),
        current,
        per_page,
        data
      }
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
