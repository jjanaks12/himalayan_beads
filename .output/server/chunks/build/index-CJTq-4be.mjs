import { _ as __nuxt_component_0 } from './nuxt-link-BAlVYdW3.mjs';
import { _ as __nuxt_component_1 } from './MdiIcon-DoZof0z_.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { Prisma } from '@prisma/client';
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
import 'moment';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

Prisma.validator()({
  include: {
    image: true,
    role: true
  }
});
const useUserStore = defineStore("user", () => {
  const userList = ref([]);
  const fetchUser = () => new Promise(async (resolve, reject) => {
    $fetch("/api/user", {
      method: "GET"
    }).then((response) => {
      if (response.status == "success")
        userList.value = response.data;
    });
  });
  return { userList, fetchUser };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Users :: Himalayan Beads"
    });
    const { userList } = storeToRefs(useUserStore());
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MdiIcon = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Users</h1></div></header><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Name</th><th>Created at</th><th>Email verified</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(userList), (user, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td><div class="wrap">`);
        if (user.image) {
          _push(`<figure class="image"><img${ssrRenderAttr("src", user == null ? void 0 : user.image.url)}${ssrRenderAttr("alt", user.name)}></figure>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="holder">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/user/" + user.id,
          class: "title"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(user.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(user.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<em class="subtitle">${ssrInterpolate(user.email)}</em><span class="badge badge--info">${ssrInterpolate(user.role.name)}</span></div></div></td><td class="text--center">${ssrInterpolate(unref(formatDate)(user.createdAt))}</td><td class="text--center">`);
        if (user.emailVerified != null) {
          _push(ssrRenderComponent(_component_MdiIcon, {
            icon: "mdiShieldCheck",
            class: "text--success"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</td><td class="text--right"><a href="#" class="btn btn--xs btn__danger">change role</a></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CJTq-4be.mjs.map
