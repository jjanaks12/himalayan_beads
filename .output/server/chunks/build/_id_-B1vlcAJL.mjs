import { a as useRoute, h as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, useSSRContext, watch } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCartStore } from './cart-D1watn9y.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
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

function useSwiper(swiperContainerRef, options) {
  const swiper = computed(() => {
    var _a2;
    var _a;
    return (_a2 = (_a = swiperContainerRef == null ? void 0 : swiperContainerRef.value) == null ? void 0 : _a.swiper) != null ? _a2 : null;
  });
  const next = (...params) => {
    if (!swiper.value)
      return;
    if (params.length === 0)
      swiper.value.slideNext();
    else
      swiper.value.slideNext(...params);
  };
  const to = (...params) => {
    if (!swiper.value)
      return;
    swiper.value.slideTo(...params);
  };
  const reset = (...params) => {
    if (!swiper.value)
      return;
    if (params.length === 0)
      swiper.value.slideReset();
    else
      swiper.value.slideReset(...params);
  };
  const prev = (...params) => {
    if (!swiper.value)
      return;
    if (params.length === 0)
      swiper.value.slidePrev();
    else
      swiper.value.slidePrev(...params);
  };
  const checkSwiperRef = () => {
    var _a;
    const isSwiperContainer = ((_a = swiperContainerRef.value) == null ? void 0 : _a.nodeName) === "SWIPER-CONTAINER";
    if (!isSwiperContainer && swiper.value !== null && !options) {
      console.warn(
        '"useSwiper()" requires a ref and is tied to the %c`<swiper-container ref="swiperContainerRef"></swiper-container>` element.',
        "font-weight: bold;"
      );
    }
  };
  watch(swiper, () => checkSwiperRef());
  return {
    instance: swiper,
    next,
    prev,
    to,
    reset
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const route = useRoute();
    const product = ([__temp, __restore] = withAsyncContext(() => $fetch(`/api/product/${route.params.productId}`, {
      method: "GET"
    })), __temp = await __temp, __restore(), __temp);
    useHead({
      title: ((_a = product == null ? void 0 : product.data) == null ? void 0 : _a.name) + " - Product :: Himalayan Beads"
    });
    const sliderRef = ref(null);
    useSwiper(sliderRef);
    const { addToCart, isInCart } = useCartStore();
    const currentPrice = computed(() => {
      var _a2, _b, _c;
      let price;
      if (((_a2 = product == null ? void 0 : product.data) == null ? void 0 : _a2.prices.length) > 0) {
        const pricedProduct = (_c = product == null ? void 0 : product.data) == null ? void 0 : _c.prices[((_b = product == null ? void 0 : product.data) == null ? void 0 : _b.prices.length) - 1];
        price = pricedProduct.price.amount;
      }
      return price;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a3;
      var _a2, _b, _c, _d, _e, _f, _g, _h;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ id: "main" }, _attrs))}><div class="container"><div class="product__section"><div class="container container--lg"><header class="product__section__header"><h1>${ssrInterpolate((_b = (_a2 = unref(product)) == null ? void 0 : _a2.data) == null ? void 0 : _b.name)}</h1></header><div class="product__body"><figure class="product__image">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</figure><div class="product__description"><em class="product__category">${ssrInterpolate((_d = (_c = unref(product)) == null ? void 0 : _c.data) == null ? void 0 : _d.category.name)}</em><div class="text__holder">${(_a3 = (_f = (_e = unref(product)) == null ? void 0 : _e.data) == null ? void 0 : _f.description) != null ? _a3 : ""}</div>`);
      if (unref(currentPrice)) {
        _push(`<!--[--><em class="product__price">$ ${ssrInterpolate(unref(currentPrice))}</em><div class="product__item__action">`);
        if (!unref(isInCart)((_h = (_g = unref(product)) == null ? void 0 : _g.data) == null ? void 0 : _h.id)) {
          _push(`<a class="btn btn__primary" href="#"><span class="icon-add"></span> Add to cart </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-B1vlcAJL.mjs.map
