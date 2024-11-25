import { useSSRContext, defineComponent, computed, ref, watch, withAsyncContext, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { f as useRuntimeConfig, _ as _export_sfc } from './server.mjs';

const cache = /* @__PURE__ */ new Map();
async function importIcon(value) {
  if (!value) {
    return "";
  }
  if (cache.has(value)) {
    return cache.get(value);
  }
  const { [value]: icon } = await import('@mdi/js');
  cache.set(value, icon);
  return icon;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MdiIcon",
  __ssrInlineRender: true,
  props: {
    size: { default: void 0 },
    flipX: { type: Boolean, default: false },
    flipY: { type: Boolean, default: false },
    icon: {},
    preserveAspectRatio: { default: "meet" }
  },
  async setup(__props) {
    let __temp, __restore;
    const options = useRuntimeConfig().public.mdi;
    const props = __props;
    const _size = computed(() => {
      if (props.size)
        return props.size;
      if (options.defaultSize)
        return options.defaultSize;
      return "1em";
    });
    const path = ref("");
    const styles = computed(() => ({
      "--flip-x": props.flipX ? "-1" : "1",
      "--flip-y": props.flipY ? "-1" : "1"
    }));
    async function updateIcon() {
      path.value = await importIcon(props.icon);
    }
    watch(async () => props.icon, ([__temp, __restore] = withAsyncContext(() => updateIcon), __temp = await __temp, __restore(), __temp));
    [__temp, __restore] = withAsyncContext(() => updateIcon()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        viewBox: "0 0 24 24",
        style: styles.value,
        width: _size.value,
        height: _size.value,
        preserveAspectRatio: _ctx.preserveAspectRatio
      }, _attrs))} data-v-c7fbaf42><path${ssrRenderAttr("d", path.value)} data-v-c7fbaf42></path></svg>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-mdi/dist/runtime/components/MdiIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7fbaf42"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=MdiIcon-DoZof0z_.mjs.map
