import { o as defineEventHandler } from '../../runtime.mjs';
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

const index_post = defineEventHandler(async (event) => {
  return "Hello Nitro";
});

export { index_post as default };
//# sourceMappingURL=index.post5.mjs.map
