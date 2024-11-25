import { _ as __nuxt_component_1 } from './MdiIcon-DoZof0z_.mjs';
import { _ as _sfc_main$1 } from './TiptapEditor-SVKCRxrb.mjs';
import { defineComponent, ref, watch, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { d as debounce } from './debounce-Bvemo6-u.mjs';
import { a as useRoute } from './server.mjs';
import '@tiptap/extension-underline';
import '@tiptap/pm/state';
import '@tiptap/pm/model';
import '@tiptap/pm/transform';
import '@tiptap/pm/commands';
import '@tiptap/pm/schema-list';
import '@tiptap/pm/history';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'requrl';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "productDescription",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const route = useRoute();
    const productDescription = ref("");
    const isLoading = ref(false);
    const isSaved = ref(false);
    watch(productDescription, async (newDescription) => {
      var _a;
      const hasChanged = newDescription !== ((_a = props.product) == null ? void 0 : _a.description);
      if (hasChanged) {
        isLoading.value = true;
        await $fetch(`/api/product/${route.params.id}/update_description`, {
          method: "PUT",
          body: {
            description: productDescription.value
          }
        }).then(() => {
          emit("update");
          isSaved.value = true;
        }).finally(() => {
          isLoading.value = false;
        });
      }
    });
    watch(() => props.product, () => {
      if (props.product)
        productDescription.value = props.product.description || "";
    });
    watch(isSaved, () => {
      if (isSaved.value)
        debounce(() => {
          isSaved.value = false;
        }, 2e3);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MdiIcon = __nuxt_component_1;
      const _component_TiptapEditor = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content__block" }, _attrs))}><div class="content__block__title"><h2>Product description</h2>`);
      if (unref(isLoading)) {
        _push(`<span class="loading"></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isSaved)) {
        _push(`<span class="text--success">`);
        _push(ssrRenderComponent(_component_MdiIcon, { icon: "mdiContentSaveCheck" }, null, _parent));
        _push(` saved </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_TiptapEditor, {
        modelValue: unref(productDescription),
        "onUpdate:modelValue": ($event) => isRef(productDescription) ? productDescription.value = $event : null,
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/_component/productDescription.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=productDescription-BXBr5JOY.mjs.map
