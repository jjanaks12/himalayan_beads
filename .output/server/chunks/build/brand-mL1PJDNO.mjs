import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_1 } from './virtual_public-BuZ72MtO.mjs';
import { b as useAuth, a as useRoute } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "brand",
  __ssrInlineRender: true,
  setup(__props) {
    const { status } = useAuth();
    const route = useRoute();
    const homeURL = computed(() => status.value == "unauthenticated" ? "/" : route.meta.layout == "admin" ? "/dashboard" : "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link, { to: unref(homeURL) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_1)} alt="Himalayan Beads"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_1,
                alt: "Himalayan Beads"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/brand.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=brand-mL1PJDNO.mjs.map
