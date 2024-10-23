import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
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
const index_post = defineEventHandler(async (event) => {
  const data = await readBody(event);
  let response = {
    status: "failed",
    message: ""
  };
  const parent_id = data.parent_category || null;
  delete data.parent_category;
  delete data.files;
  if (data.id) {
    const id = data.id;
    delete data.id;
    await prisma.category.findFirst({
      where: {
        id: data.id
      }
    }).then(async () => {
      await prisma.category.update({
        where: {
          id
        },
        data: {
          ...data,
          parent_id
        }
      }).then((category) => {
        response = {
          status: "success",
          data: category
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
  } else
    await prisma.category.create({
      data: {
        ...data,
        parent_id
      }
    }).then((category) => {
      response = {
        status: "success",
        data: category
      };
    }).catch((e) => {
      console.log(e);
      response = {
        status: "failed",
        message: "Something wrong with the database"
      };
    });
  return response;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
