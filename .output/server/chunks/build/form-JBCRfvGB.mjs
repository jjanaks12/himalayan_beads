import { defineComponent, ref, computed, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { p as productPriceSchema } from './product.schema-HEldBoIJ.mjs';
import { a as useRoute } from './server.mjs';
import 'yup';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const route = useRoute();
    const emit = __emit;
    const isLoading = ref(false);
    const product_id = computed(() => route.params.id);
    const formSubmit = async (values) => {
      isLoading.value = true;
      await $fetch(`/api/product/${route.params.id}/rate`, {
        method: "POST",
        body: { ...values }
      }).then(() => {
        emit("update");
      }).finally(() => {
        isLoading.value = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(productPriceSchema),
        onSubmit: formSubmit,
        class: "form"
      }, _attrs), {
        default: withCtx(({ errors }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Field), {
              type: "hidden",
              name: "product_id",
              value: unref(product_id)
            }, null, _parent2, _scopeId));
            _push2(`<div class="form__group"${_scopeId}><label for="prf__amount"${_scopeId}>Amount</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "number",
              name: "amount",
              id: "prf__amount"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "amount"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode(unref(Field), {
                type: "hidden",
                name: "product_id",
                value: unref(product_id)
              }, null, 8, ["value"]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "prf__amount" }, "Amount"),
                createVNode(unref(Field), {
                  type: "number",
                  name: "amount",
                  id: "prf__amount"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "amount"
                })
              ]),
              createVNode("div", { class: "text--right" }, [
                createVNode("button", {
                  type: "submit",
                  class: { "btn btn__primary": true, "loading": unref(isLoading) }
                }, "Save", 2)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/_component/rate/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-JBCRfvGB.mjs.map
