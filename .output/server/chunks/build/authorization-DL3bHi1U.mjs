import { j as defineNuxtRouteMiddleware, k as showError } from './server.mjs';
import { u as useAuthorization } from './authorization-BlcTZSD-.mjs';
import 'vue';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';

const authorization = defineNuxtRouteMiddleware((to, from) => {
  var _a, _b, _c;
  const { can } = useAuthorization();
  if (to.meta.role) {
    if (!can((_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.permission, (_b = to == null ? void 0 : to.meta) == null ? void 0 : _b.role))
      throw showError({
        status: 403,
        statusMessage: "You do not have enough permission"
      });
  }
  if (to.meta.permission) {
    if (!can((_c = to == null ? void 0 : to.meta) == null ? void 0 : _c.permission))
      throw showError({
        status: 403,
        statusMessage: "You do not have enough permission"
      });
  } else
    throw showError({
      status: 403,
      statusMessage: "Permission not set"
    });
});

export { authorization as default };
//# sourceMappingURL=authorization-DL3bHi1U.mjs.map
