import { d as defineEventHandler, r as readBody } from '../../../../runtime.mjs';
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
  const { files, product_id } = await readBody(event);
  const product = await prisma.product.findFirst({
    where: { id: product_id }
  });
  if (product) {
    const images = await $fetch("/api/image", {
      method: "POST",
      body: { files }
    });
    images.map(async (image) => await prisma.imageOnProduct.create({
      data: {
        product_id,
        image_id: image.id
      }
    }));
    return { status: "success", data: product };
  } else
    return product;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
