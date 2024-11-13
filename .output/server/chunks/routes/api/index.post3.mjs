import { o as defineEventHandler, r as readBody } from '../../runtime.mjs';
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
  const data = await readBody(event);
  return data;
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
