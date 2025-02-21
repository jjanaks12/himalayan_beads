import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useProductStore } from './product-CB4cTNXd.mjs';
import _sfc_main$1 from './productItem-D8XyF5HL.mjs';
import { s as storeToRefs } from './server.mjs';
import '@prisma/client';
import './debounce-Bvemo6-u.mjs';
import './nuxt-link-BnP_J6z-.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import './Button-__geryau.mjs';
import './authorization-BlcTZSD-.mjs';
import './product-Df98zCkI.mjs';
import './cart-D1watn9y.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "product",
  __ssrInlineRender: true,
  setup(__props) {
    const { productList } = storeToRefs(useProductStore());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "product__section" }, _attrs))}><div class="container container--lg"><header class="product__section__header"><h2>Featured This Week: Discover Our Best Rudraksha Collection</h2></header><div class="product__item__list product__item__list--grid"><!--[-->`);
      ssrRenderList(unref(productList), (product) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          class: "product__item",
          product
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_home/product.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=product-Bi1AkPG_.mjs.map
