import { n as defineEventHandler } from '../../../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const prisma = new PrismaClient();
const _id__delete = defineEventHandler(async (event) => {
  var _a, _b;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  await prisma.category.findFirst({
    where: { id }
  }).then(() => {
    prisma.category.update({
      where: { id },
      data: {
        deletedAt: /* @__PURE__ */ new Date()
      }
    }).then((category) => {
    });
  }).catch(() => {
  });
  return (_b = event.context.params) == null ? void 0 : _b.id;
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
