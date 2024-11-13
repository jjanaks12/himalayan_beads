import { n as defineEventHandler } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';

const index_post = defineEventHandler(async (event) => {
  return "Hello Nitro";
});

export { index_post as default };
//# sourceMappingURL=index.post5.mjs.map
