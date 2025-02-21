import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useHead } from './index-CCqbQxu4.mjs';
import './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Dashboard :: Himalayan Beads"
    });
    const dashboardDetails = ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "content__section" }, _attrs))}><header class="content__header sr-only"><div class="content__header__holder"><h1>Dashboard</h1></div></header><div class="content__body"><section class="card"><header class="card__header"><h2 class="card__title">Products</h2></header><main class="card__body"><dl class="card__stats"><!--[-->`);
      ssrRenderList(unref(dashboardDetails), (value, key) => {
        _push(`<!--[--><dt>${ssrInterpolate(key)}:</dt><dd>${ssrInterpolate(value)}</dd><!--]-->`);
      });
      _push(`<!--]--></dl></main></section></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BZ2bwtE1.mjs.map
