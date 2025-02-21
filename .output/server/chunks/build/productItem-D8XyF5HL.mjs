import { _ as __nuxt_component_0 } from './nuxt-link-BnP_J6z-.mjs';
import { _ as _sfc_main$1 } from './Button-__geryau.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useProduct } from './product-Df98zCkI.mjs';
import { u as useCartStore } from './cart-D1watn9y.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';
import './authorization-BlcTZSD-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "productItem",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const { featuredImage, currentPrice } = useProduct(props.product);
    const { addToCart, isInCart } = useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Button = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product__item" }, _attrs))}><figure class="product__item__image"><img${ssrRenderAttr("src", unref(featuredImage))}${ssrRenderAttr("alt", _ctx.product.name)}></figure><div class="product__item__detail"><h3 class="h6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/product/" + _ctx.product.id
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><em class="product__category">${ssrInterpolate(_ctx.product.category.name)}</em>`);
      if (unref(currentPrice)) {
        _push(`<em class="product__price">$ ${ssrInterpolate(unref(currentPrice))}</em>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="product__item__action">`);
      if (!unref(isInCart)(_ctx.product.id) && unref(currentPrice)) {
        _push(ssrRenderComponent(_component_Button, {
          permission: "create_order",
          onClick: ($event) => unref(addToCart)(_ctx.product)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="icon-add"${_scopeId}></span> Add to cart `);
            } else {
              return [
                createVNode("span", { class: "icon-add" }),
                createTextVNode(" Add to cart ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_home/productItem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=productItem-D8XyF5HL.mjs.map
