import { d as defineStore } from './server.mjs';
import { ref, defineComponent, mergeModels, useModel, watch, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

const useProductCategoryStore = defineStore("product_category", () => {
  const categoryList = ref([]);
  const fetchCategory = async () => {
    $fetch("/api/category").then((response) => {
      if (response.status == "success")
        categoryList.value = response.data;
    });
  };
  const saveCategory = (values) => new Promise((resolve, reject) => {
    {
      $fetch("/api/category", {
        method: "POST",
        body: values
      }).then((a) => {
        if (a.status == "success")
          resolve(true);
        else
          reject(a.message);
      });
    }
  });
  return { fetchCategory, saveCategory, categoryList };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Alert",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: { default: "" },
    subTitle: { default: null },
    confirmText: { default: "Ok!" },
    onConfirm: { type: Function, default: () => {
    } },
    cancelText: { default: "No!" },
    onCancel: { type: Function, default: () => {
    } }
  }, {
    "loading": {
      type: Boolean,
      default: false
    },
    "loadingModifiers": {},
    "show": {
      type: Boolean,
      default: false
    },
    "showModifiers": {}
  }),
  emits: ["update:loading", "update:show"],
  setup(__props) {
    const props = __props;
    const loading = useModel(__props, "loading");
    const show = useModel(__props, "show");
    const alert = ref();
    const init = () => {
      if (show.value) {
        (void 0).body.style.overflow = "hidden";
        setTimeout(() => {
          (void 0).addEventListener("click", clickOnOutside);
        }, 500);
      } else {
        (void 0).body.style.overflow = "";
        (void 0).removeEventListener("click", clickOnOutside);
      }
    };
    const clickOnOutside = (event) => {
      if (show.value) {
        event.preventDefault();
        event.stopPropagation();
        if (!alert.value.contains(event.target)) {
          show.value = false;
          props.onCancel();
        }
      }
    };
    watch(show, () => {
      init();
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="${ssrRenderClass({ "alert": true, "alert--show": show.value })}"><div class="alert__holder"><a href="#" class="alert__close"><span class="icon-add"></span></a><div class="alert__icon"><span class="icon-question-c"></span></div><div class="alert__message"><strong class="title">${ssrInterpolate(_ctx.title)}</strong>`);
        if (_ctx.subTitle) {
          _push2(`<em class="subtitle">${ssrInterpolate(_ctx.subTitle)}</em>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="text">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        _push2(`</div></div><div class="alert__action"><button type="button" class="btn btn__primary btn--outline">${ssrInterpolate(_ctx.cancelText)}</button><button type="button" class="${ssrRenderClass({ "btn btn__primary": true, "loading": loading.value })}">${ssrInterpolate(_ctx.confirmText)}</button></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, useProductCategoryStore as u };
//# sourceMappingURL=Alert-C3whoaLR.mjs.map
