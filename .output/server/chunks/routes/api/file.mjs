import { d as defineEventHandler, u as useRuntimeConfig } from '../../runtime.mjs';
import { fileURLToPath } from 'node:url';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';

const file = defineEventHandler(async (event) => {
  const { storage } = useRuntimeConfig();
  return fileURLToPath(storage + "/IqyUMyjv.jpg");
});

export { file as default };
//# sourceMappingURL=file.mjs.map
