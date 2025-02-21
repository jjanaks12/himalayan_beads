import { d as defineEventHandler, r as readBody } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  const data = await readBody(event);
  return data;
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
