import { d as defineEventHandler } from '../../../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const _image_id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.image_id;
  let response = {
    status: "failed",
    message: ""
  };
  if (!id)
    response.message = "You need to send ID of the image";
  const image = await prisma.imageOnProduct.findFirst({
    where: { id },
    include: {
      images: true
    }
  });
  if (!image)
    response.message = "That image doesnot exits";
  else {
    const res = await $fetch(`/api/image/${image == null ? void 0 : image.images.id}`, {
      method: "DELETE"
    });
    if (res.status == "failed")
      response.message = "Could not delete image";
    else {
      await prisma.imageOnProduct.delete({
        where: { id }
      });
      response = {
        status: "success",
        data: "Deleted"
      };
    }
  }
  return response;
});

export { _image_id__delete as default };
//# sourceMappingURL=_image_id_.delete.mjs.map
