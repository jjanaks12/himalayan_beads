import { defineComponent, ref, watch, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { r as roleSchema } from './settings.schema-EnYZLrMs.mjs';
import { u as usePermissionStore } from './permission-BOmgRbhH.mjs';
import { s as storeToRefs } from './server.mjs';
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
  props: {
    role: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { permissionList } = storeToRefs(usePermissionStore());
    usePermissionStore();
    const isLoading = ref(false);
    const form = ref();
    const onSubmit = (values) => {
      isLoading.value = true;
      $fetch(`/api/role`, {
        method: "POST",
        body: { ...values }
      }).then(() => {
        emit("update");
      }).finally(() => {
        isLoading.value = false;
      });
    };
    const initializeForm = () => {
      var _a, _b, _c, _d, _e, _f;
      (_a = form.value) == null ? void 0 : _a.resetForm();
      if (props.role) {
        (_c = form.value) == null ? void 0 : _c.setFieldValue("id", (_b = props.role) == null ? void 0 : _b.id);
        (_d = form.value) == null ? void 0 : _d.setFieldValue("name", props.role.name);
        (_e = form.value) == null ? void 0 : _e.setFieldValue("description", props.role.description || "");
        (_f = form.value) == null ? void 0 : _f.setFieldValue("permissions", props.role.permissions.map((permission) => permission.id));
      }
    };
    watch(props, () => {
      initializeForm();
    }, {
      deep: true,
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        class: "form",
        "validation-schema": unref(roleSchema),
        onSubmit,
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form__group"${_scopeId}><label for="rf__name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "name",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "name",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="rf__description"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "description" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<textarea${ssrRenderAttrs(_temp0 = mergeProps(field, { id: "rf__description" }), "textarea")}${_scopeId2}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
                } else {
                  return [
                    createVNode("textarea", mergeProps(field, { id: "rf__description" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "description",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><strong class="label"${_scopeId}>Permissions</strong><div class="custom__checkbox__group"${_scopeId}><!--[-->`);
            ssrRenderList(unref(permissionList), (permission) => {
              _push2(`<label class="custom__checkbox"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Field), {
                name: "permissions",
                type: "checkbox",
                value: permission.id
              }, {
                default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<input${ssrRenderAttrs(mergeProps({
                      type: "checkbox",
                      value: permission.id,
                      ref_for: true
                    }, field))}${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("input", mergeProps({
                        type: "checkbox",
                        value: permission.id,
                        ref_for: true
                      }, field), null, 16, ["value"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<span class="custom__checkbox__text"${_scopeId}>${ssrInterpolate(permission.name)}</span></label>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "permissions",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "rf__name" }, "Name"),
                createVNode(unref(Field), {
                  name: "name",
                  type: "text"
                }),
                createVNode(unref(ErrorMessage), {
                  name: "name",
                  class: "input--error"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "rf__description" }, "Description"),
                createVNode(unref(Field), { name: "description" }, {
                  default: withCtx(({ field }) => [
                    createVNode("textarea", mergeProps(field, { id: "rf__description" }), null, 16)
                  ]),
                  _: 1
                }),
                createVNode(unref(ErrorMessage), {
                  name: "description",
                  class: "input--error"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("strong", { class: "label" }, "Permissions"),
                createVNode("div", { class: "custom__checkbox__group" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(permissionList), (permission) => {
                    return openBlock(), createBlock("label", { class: "custom__checkbox" }, [
                      createVNode(unref(Field), {
                        name: "permissions",
                        type: "checkbox",
                        value: permission.id
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode("input", mergeProps({
                            type: "checkbox",
                            value: permission.id,
                            ref_for: true
                          }, field), null, 16, ["value"])
                        ]),
                        _: 2
                      }, 1032, ["value"]),
                      createVNode("span", { class: "custom__checkbox__text" }, toDisplayString(permission.name), 1)
                    ]);
                  }), 256))
                ]),
                createVNode(unref(ErrorMessage), {
                  name: "permissions",
                  class: "input--error"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/settings/_role/form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=form-u8a37CdM.mjs.map
