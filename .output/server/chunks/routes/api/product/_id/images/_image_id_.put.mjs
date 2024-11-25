import { o as defineEventHandler } from '../../../../../runtime.mjs';
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
import 'requrl';

const prisma = new PrismaClient();
const _image_id__put = defineEventHandler(async (event) => {
  var _a, _b;
  const id = (_a = event.context.params) == null ? void 0 : _a.image_id;
  const product_id = (_b = event.context.params) == null ? void 0 : _b.id;
  let response = {
    status: "failed",
    message: ""
  };
  if (!id)
    response.message = "You need to send ID of the image";
  const image = await prisma.imageOnProduct.findFirst({ where: { id } });
  if (!image)
    response.message = "That image doesnot exits";
  else {
    await prisma.imageOnProduct.updateMany({
      where: {
        product_id,
        featured: true
      },
      data: {
        featured: false
      }
    });
    await prisma.imageOnProduct.update({
      where: { id },
      data: {
        featured: true
      }
    });
    response = {
      status: "success",
      data: image
    };
  }
  return response;
});

export { _image_id__put as default };
//# sourceMappingURL=_image_id_.put.mjs.map
