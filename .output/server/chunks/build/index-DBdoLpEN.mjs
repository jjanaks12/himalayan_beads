import { _ as __nuxt_component_0 } from './nuxt-link-BnP_J6z-.mjs';
import { useSSRContext, defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useCartStore } from './cart-D1watn9y.mjs';
import _sfc_main$2 from './CheckoutForm-CX8XEt13.mjs';
import { u as useProduct } from './product-Df98zCkI.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import { s as storeToRefs } from './server.mjs';
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
import 'vee-validate';
import 'yup';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'pinia-plugin-persistedstate';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "cartItem",
  __ssrInlineRender: true,
  props: {
    cartItem: {}
  },
  setup(__props) {
    const props = __props;
    const { currentPrice, featuredImage } = useProduct(props.cartItem.product);
    useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "product__item" }, _attrs))}><figure class="product__item__image"><img${ssrRenderAttr("src", unref(featuredImage))} alt="product image"></figure><div class="product__item__detail"><h3 class="h6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/product/" + _ctx.cartItem.product.id
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.cartItem.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.cartItem.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><em class="product__category">${ssrInterpolate(_ctx.cartItem.product.category.name)}</em><em class="product__price">$ ${ssrInterpolate(unref(currentPrice))}</em></div><div class="product__item__action"><a class="btn btn__primary btn--outline btn--xs" href="#"><span class="icon-add"></span> remove </a></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default/_partials/cart/cartItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Checkout your order"
    });
    const { list } = storeToRefs(useCartStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "checkout__section" }, _attrs))}><div class="container">`);
      if (unref(list).length > 0) {
        _push(`<div class="row"><div class="col-5"><aside class="checkout__sidebar"><h2>Product summary</h2><div class="product__item__list product__item__list--list"><!--[-->`);
        ssrRenderList(unref(list), (cartItem, index) => {
          _push(ssrRenderComponent(_sfc_main$1, {
            "cart-item": cartItem,
            index
          }, null, _parent));
        });
        _push(`<!--]--></div></aside></div><div class="col-7"><div class="checkout__content"><h2>Checkout details</h2>`);
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<div class="checkout__empty text--center"><h1>Your cart is empty</h1><p>Check `);
        _push(ssrRenderComponent(_component_NuxtLink, { to: { name: "product" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`these products`);
            } else {
              return [
                createTextVNode("these products")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`, you may find what you are looking for</p></div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DBdoLpEN.mjs.map
