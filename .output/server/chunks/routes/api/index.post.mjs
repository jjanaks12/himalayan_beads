import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
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
  const parent_id = data.parent_category || null;
  delete data.parent_category;
  let imageList = [];
  if (data.files.length > 0) {
    imageList = await $fetch("/api/image", {
      method: "POST",
      body: { files: data.files }
    });
    delete data.files;
  }
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
          parent_id,
          image_id: imageList[0].id
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
        parent_id,
        image_id: imageList[0].id
      }
    }).then((category) => {
      response = {
        status: "success",
        data: category
      };
    }).catch(() => {
      response = {
        status: "failed",
        message: "Something wrong with the database"
      };
    });
  return response;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
