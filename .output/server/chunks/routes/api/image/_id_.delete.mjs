import { d as defineEventHandler, u as useRuntimeConfig } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs/promises';
import path from 'node:path';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'requrl';
import 'node:url';

const { storage } = useRuntimeConfig();
const prisma = new PrismaClient();
const _id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  let response = {
    status: "failed",
    message: ""
  };
  if (!id)
    response.message = "You need to send ID of the image";
  const image = await prisma.image.findFirst({ where: { id } });
  if (!image)
    response.message = "That image doesnot exits";
  else {
    const deletePath = path.join(storage, image.name);
    await fs.unlink(deletePath);
    await prisma.image.delete({
      where: { id }
    });
    response = {
      status: "success",
      data: image
    };
  }
  return response;
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
