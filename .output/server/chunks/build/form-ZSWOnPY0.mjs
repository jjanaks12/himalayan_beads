import { defineComponent, ref, unref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { p as permissionSchema } from './settings.schema-EnYZLrMs.mjs';
import 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(false);
    const onSubmit = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        class: "form",
        "validation-schema": unref(permissionSchema),
        onSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form__group"${_scopeId}><label for="pf__name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              type: "text",
              id: "pf__name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="pf__description"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "description" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<textarea${ssrRenderAttrs(_temp0 = mergeProps(field, { id: "pf__description" }), "textarea")}${_scopeId2}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
                } else {
                  return [
                    createVNode("textarea", mergeProps(field, { id: "pf__description" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "description"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "pf__name" }, "Name"),
                createVNode(unref(Field), {
                  name: "name",
                  type: "text",
                  id: "pf__name"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "name"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "pf__description" }, "Description"),
                createVNode(unref(Field), { name: "description" }, {
                  default: withCtx(({ field }) => [
                    createVNode("textarea", mergeProps(field, { id: "pf__description" }), null, 16)
                  ]),
                  _: 1
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "description"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/settings/_permission/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-ZSWOnPY0.mjs.map
