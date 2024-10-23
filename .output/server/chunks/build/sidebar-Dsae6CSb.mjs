import { _ as __nuxt_component_0 } from './nuxt-link-DyES5sK8.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _imports_0 } from './virtual_public-DA-13Mhu.mjs';
import { _ as _export_sfc } from './server.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<aside${ssrRenderAttrs(mergeProps({ id: "sidebar" }, _attrs))}><div class="sidebar__header"><div class="logo"><a href="#"><img${ssrRenderAttr("src", _imports_0)} alt="Himalayan Beads"></a></div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "menu__link",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`To site`);
      } else {
        return [
          createTextVNode("To site")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><ul class="main__menu"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Dashboard`);
      } else {
        return [
          createTextVNode("Dashboard")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/product" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Product`);
      } else {
        return [
          createTextVNode("Product")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/category" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Product Category`);
      } else {
        return [
          createTextVNode("Product Category")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/login",
    class: "menu__link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Logout`);
      } else {
        return [
          createTextVNode("Logout")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</aside>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin/sidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppSidebar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { AppSidebar as default };
//# sourceMappingURL=sidebar-Dsae6CSb.mjs.map
