import { useSSRContext, defineComponent, computed, unref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuthorization } from './authorization-BlcTZSD-.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    color: { default: "primary" },
    variant: { default: "default" },
    permission: { default: "*" },
    loading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { can } = useAuthorization();
    const classList = computed(() => ({
      "btn": true,
      "loading": props.loading,
      [`btn__${props.color}`]: true,
      [`btn--${props.variant}`]: true
    }));
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(can)(_ctx.permission)) {
        _push(`<button${ssrRenderAttrs(mergeProps({ class: unref(classList) }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Button-__geryau.mjs.map
