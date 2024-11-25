import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import 'moment';
import '../runtime.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const usePermissionStore = defineStore("permission", () => {
  const permissionList = ref([]);
  const fetchUser = () => {
    $fetch("/api/permission", {
      method: "GET"
    }).then((response) => {
      if (response.status == "success")
        permissionList.value = response.data;
    });
  };
  return { permissionList, fetchUser };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "permission",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Permissions :: Himalayan Beads"
    });
    const { permissionList } = storeToRefs(usePermissionStore());
    usePermissionStore();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Permissions</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Permission </a></div></header><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(permissionList), (permission, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(permission.name)}</td><td>${ssrInterpolate(unref(formatDate)(permission.createdAt))}</td><td class="text--right"></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/settings/permission.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=permission-Dt8mej-G.mjs.map
