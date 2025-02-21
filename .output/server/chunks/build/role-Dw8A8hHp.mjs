import { _ as _sfc_main$2 } from './ThemeButton-CqTpY8QS.mjs';
import { _ as __nuxt_component_1 } from './MdiIcon-DoZof0z_.mjs';
import { _ as _sfc_main$3 } from './Modal-Bzzq87MF.mjs';
import { defineComponent, ref, watch, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import _sfc_main$1 from './form-u8a37CdM.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import './authorization-BlcTZSD-.mjs';
import './debounce-Bvemo6-u.mjs';
import 'moment';
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
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import 'vee-validate';
import './settings.schema-EnYZLrMs.mjs';
import 'yup';
import './permission-BOmgRbhH.mjs';

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
    const { fetchRoles } = useRoleStore();
    const showForm = ref(false);
    const editRole = ref(null);
    watch(editRole, () => {
      if (editRole.value)
        showForm.value = true;
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ThemeButton = _sfc_main$2;
      const _component_MdiIcon = __nuxt_component_1;
      const _component_Modal = _sfc_main$3;
      _push(`<!--[--><section class="datatable__section"><header class="datatable__header"><div class="datatable__header__holder"><h1>Roles</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Roles </a></div></header><div class="datatable__body"><table><thead><tr><th class="sn"></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(roleList), (role, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td><div class="wrap"><div class="holder"><strong class="title">${ssrInterpolate(role.name)}</strong><div class="badge__group"><!--[-->`);
        ssrRenderList(role.permissions, (permission) => {
          _push(`<span class="badge badge--info">${ssrInterpolate(permission.name)}</span>`);
        });
        _push(`<!--]--></div></div></div></td><td class="text--center">${ssrInterpolate(unref(formatDate)(role.createdAt))}</td><td class="text--right">`);
        _push(ssrRenderComponent(_component_ThemeButton, {
          size: "xl",
          onClick: ($event) => editRole.value = role,
          persmission: "update_role"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_MdiIcon, {
                preserveAspectRatio: "xMidYMid meet",
                icon: "mdiPencil",
                size: "16"
              }, null, _parent2, _scopeId));
              _push2(` edit `);
            } else {
              return [
                createVNode(_component_MdiIcon, {
                  preserveAspectRatio: "xMidYMid meet",
                  icon: "mdiPencil",
                  size: "16"
                }),
                createTextVNode(" edit ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
      _push(ssrRenderComponent(_component_Modal, {
        show: unref(showForm),
        size: "xl",
        "onModal:close": () => {
          showForm.value = false;
          editRole.value = null;
        }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              role: unref(editRole),
              onUpdate: () => {
                showForm.value = false;
                editRole.value = null;
                unref(fetchRoles)();
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                role: unref(editRole),
                onUpdate: () => {
                  showForm.value = false;
                  editRole.value = null;
                  unref(fetchRoles)();
                }
              }, null, 8, ["role", "onUpdate"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/settings/role.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=role-Dw8A8hHp.mjs.map
