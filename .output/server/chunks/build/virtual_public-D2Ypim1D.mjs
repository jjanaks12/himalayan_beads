import { useSSRContext, defineComponent, ref, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, renderSlot } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderTeleport, ssrRenderVNode } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    as: { default: "div" }
  },
  setup(__props) {
    const isActive = ref(false);
    const dropdown = ref();
    const isMobile = ref(false);
    const toggleDropdown = () => {
      isActive.value = !isActive.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: { "dropdown": true, "dropdown--active": unref(isActive) },
        ref_key: "dropdown",
        ref: dropdown
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "opener", { clickHandler: toggleDropdown }, null, _push, _parent);
      if (!unref(isMobile)) {
        ssrRenderTeleport(_push, (_push2) => {
          ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(_ctx.as), {
            class: { "dropdown__menu": true, "dropdown--active": unref(isActive) }
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<div class="dropdown__holder"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent2, _scopeId);
                _push3(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "dropdown__holder" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ];
              }
            }),
            _: 3
          }), _parent);
        }, "body", false, _parent);
      } else {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), {
          class: { "dropdown__menu": true, "dropdown--active": unref(isActive) }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="dropdown__holder"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "dropdown__holder" }, [
                  renderSlot(_ctx.$slots, "default")
                ])
              ];
            }
          }),
          _: 3
        }), _parent);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Dropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _imports_1 = publicAssetsURL("/images/flag-us.png");

export { _imports_1 as _, _sfc_main as a };
//# sourceMappingURL=virtual_public-D2Ypim1D.mjs.map
