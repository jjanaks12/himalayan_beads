import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, ref, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "copy",
  __ssrInlineRender: true,
  props: {
    copyText: {}
  },
  setup(__props) {
    const isCopied = ref(false);
    watch(isCopied, () => {
      if (isCopied.value)
        setTimeout(() => {
          isCopied.value = false;
        }, 3e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MdiIcon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "copy" }, _attrs))}>`);
      if (!unref(isCopied)) {
        _push(`<a href="#" class="copy__btn" title="Click to copy">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(ssrRenderComponent(_component_MdiIcon, { icon: "mdiContentCopy" }, null, _parent));
        _push(`</a>`);
      } else {
        _push(`<span class="copy__text"> Copied `);
        _push(ssrRenderComponent(_component_MdiIcon, { icon: "mdiCheck" }, null, _parent));
        _push(`</span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/copy.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const featuredProduct = computed(() => {
      var _a;
      let image = "";
      if (props.product.images.length > 0) {
        const featuredImage = props.product.images.find((image2) => image2.featured);
        if (featuredImage)
          image = (_a = featuredImage == null ? void 0 : featuredImage.images) == null ? void 0 : _a.url;
      }
      return image;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Copy = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrap" }, _attrs))}>`);
      if (unref(featuredProduct)) {
        _push(`<figure class="image"><img${ssrRenderAttr("src", unref(featuredProduct))}${ssrRenderAttr("alt", _ctx.product.name)}></figure>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="holder">`);
      _push(ssrRenderComponent(_component_Copy, {
        class: "id",
        "copy-text": _ctx.product.id
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.product.id)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.product.id), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard/product/" + _ctx.product.id,
        class: "title"
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
      _push(`<em class="subtitle">${ssrInterpolate((_a = _ctx.product.category) == null ? void 0 : _a.name)}</em></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/_component/Item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Item-BVP88x_9.mjs.map
