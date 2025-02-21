import { useSSRContext, defineComponent, unref, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot } from 'vue';
import { ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthorization } from './authorization-BlcTZSD-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ThemeButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "solid" },
    size: { default: "md" },
    type: { default: "primary" },
    as: { default: "button" },
    persmission: { default: "*" }
  },
  setup(__props) {
    const { can } = useAuthorization();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(can)(_ctx.persmission)) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
          class: {
            "btn": true,
            ["btn--" + _ctx.size]: true,
            ["btn--" + _ctx.variant]: true,
            ["btn__" + _ctx.type]: true
          }
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }), _parent);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThemeButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ThemeButton-CqTpY8QS.mjs.map
