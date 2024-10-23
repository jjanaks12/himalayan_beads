import { d as defineEventHandler } from '../../../runtime.mjs';
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
