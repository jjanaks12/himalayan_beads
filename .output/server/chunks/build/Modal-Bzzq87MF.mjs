import { defineComponent, mergeModels, ref, useModel, watch, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { d as debounce } from './debounce-Bvemo6-u.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    size: { default: "md" }
  }, {
    "show": {
      required: true,
      default: false
    },
    "showModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["modal:close"], ["update:show"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modal = ref();
    const isActive = useModel(__props, "show");
    const closeModal = () => {
      isActive.value = false;
      emit("modal:close");
    };
    const clickOnOutside = (event) => debounce(() => {
      if (isActive.value) {
        if (!modal.value.contains(event.target)) {
          event.preventDefault();
          closeModal();
        }
      }
    });
    watch(isActive, () => {
      if (isActive.value)
        setTimeout(() => {
          (void 0).addEventListener("click", clickOnOutside);
        }, 500);
      else
        (void 0).removeEventListener("click", clickOnOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<section class="${ssrRenderClass({ "modal": true, ["modal--" + _ctx.size]: true, "modal--active": isActive.value })}"><div class="modal__content"><a href="#" class="modal__close"><span class="icon-add"></span></a>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        _push2(`</div></section>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Modal-Bzzq87MF.mjs.map
