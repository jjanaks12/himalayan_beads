import { d as defineEventHandler } from '../../runtime.mjs';
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

const index_get = defineEventHandler(async (event) => {
  return {
    status: "success",
    message: "test"
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
