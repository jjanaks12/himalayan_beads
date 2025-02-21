import { _ as __nuxt_component_1 } from './MdiIcon-DoZof0z_.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Modal-Bzzq87MF.mjs';
import _sfc_main$2 from './form-ZSWOnPY0.mjs';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { u as usePermissionStore } from './permission-BOmgRbhH.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import { s as storeToRefs } from './server.mjs';
import './debounce-Bvemo6-u.mjs';
import 'vee-validate';
import './settings.schema-EnYZLrMs.mjs';
import 'yup';
import 'moment';
import '@unhead/shared';
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
import '@unhead/ssr';
import 'unhead';
import 'vue-router';
import 'pinia-plugin-persistedstate';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "permission",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Permissions :: Himalayan Beads"
    });
    const { permissionList } = storeToRefs(usePermissionStore());
    usePermissionStore();
    const showForm = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MdiIcon = __nuxt_component_1;
      _push(`<!--[--><section class="datatable__section"><header class="datatable__header"><div class="datatable__header__holder"><h1>Permissions</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Permission </a></div></header><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(permissionList), (permission, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(permission.name)}</td><td class="text--center">${ssrInterpolate(unref(formatDate)(permission.createdAt))}</td><td class="text--right"><a href="#" class="btn btn__info btn--xs">`);
        _push(ssrRenderComponent(_component_MdiIcon, {
          preserveAspectRatio: "xMidYMid meet",
          icon: "mdiPencil",
          size: "16"
        }, null, _parent));
        _push(` edit </a></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        show: unref(showForm),
        "onModal:close": ($event) => showForm.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
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
//# sourceMappingURL=permission-BsygnKFR.mjs.map
