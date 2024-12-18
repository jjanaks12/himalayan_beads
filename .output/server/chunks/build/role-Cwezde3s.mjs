import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
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

const useRoleStore = defineStore("role", () => {
  const roleList = ref([]);
  const fetchRoles = async () => {
    const roles = await $fetch("/api/role", {
      method: "GET"
    });
    roleList.value = roles.data;
  };
  return { roleList, fetchRoles };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "role",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Roles :: Himalayan Beads"
    });
    const { roleList } = storeToRefs(useRoleStore());
    useRoleStore();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Roles</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Roles </a></div></header><div class="datatable__body"><table><thead><tr><th class="sn"></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(roleList), (role, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(role.name)}</td><td></td><td></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/settings/role.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=role-Cwezde3s.mjs.map
