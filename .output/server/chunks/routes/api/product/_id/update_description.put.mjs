import { n as defineEventHandler, r as readBody } from '../../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const update_description_put = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const data = await readBody(event);
  let response = {
    status: "failed",
    message: ""
  };
  await prisma.product.update({
    where: { id },
    data: { description: data.description }
  }).then((product) => {
    response = {
      status: "success",
      data: product
    };
  });
  return response;
});

export { update_description_put as default };
//# sourceMappingURL=update_description.put.mjs.map
