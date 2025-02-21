import { _ as _sfc_main$1 } from './Button-__geryau.mjs';
import { defineComponent, ref, watch, unref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, withDirectives, isRef, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { s as storeToRefs, d as defineStore, n as navigateTo } from './server.mjs';
import { u as useCartStore } from './cart-D1watn9y.mjs';
import './authorization-BlcTZSD-.mjs';
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

const checkoutSchema = Yup.object().shape({
  billing_street: Yup.string().required().label("Street"),
  billing_address: Yup.string().required().label("Address"),
  billing_city: Yup.string().required().label("City"),
  billing_state: Yup.string().required().label("State"),
  billing_zipcode: Yup.string().required().label("Zipcode"),
  billing_country: Yup.string().required().label("Country"),
  shipping_street: Yup.string().required().label("Street"),
  shipping_address: Yup.string().required().label("Address"),
  shipping_city: Yup.string().required().label("City"),
  shipping_state: Yup.string().required().label("State"),
  shipping_zipcode: Yup.string().required().label("Zipcode"),
  shipping_country: Yup.string().required().label("Country")
});
const useAppStore = defineStore("app", () => {
  const countryList = ref([]);
  const fetchCountry = async () => {
    const countries = await $fetch("/api/country");
    countryList.value = countries;
  };
  return { countryList, fetchCountry };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CheckoutForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { countryList } = storeToRefs(useAppStore());
    const { list } = storeToRefs(useCartStore());
    useAppStore();
    const sameAsAbove = ref(false);
    const isLoading = ref(false);
    const form = ref();
    const formSubmit = async (values) => {
      isLoading.value = true;
      await $fetch("/api/cart/checkout", {
        method: "POST",
        body: { ...values, cart: list.value }
      }).then(() => {
        list.value = [];
        navigateTo({
          name: "product"
        });
      }).finally(() => {
        isLoading.value = false;
      });
    };
    watch(sameAsAbove, () => {
      if (sameAsAbove.value) {
        const formData = { ...form.value.values };
        form.value.setValues({
          ...formData,
          shipping_street: formData.billing_street,
          shipping_address: formData.billing_address,
          shipping_city: formData.billing_city,
          shipping_state: formData.billing_state,
          shipping_zipcode: formData.billing_zipcode,
          shipping_country: formData.billing_country
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$1;
      _push(ssrRenderComponent(unref(Form), mergeProps({
        "validation-schema": unref(checkoutSchema),
        onSubmit: formSubmit,
        class: "form",
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<fieldset${_scopeId}><h3${_scopeId}>Billing address</h3><div class="row"${_scopeId}><div class="col-6"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_street"${_scopeId}>Street</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "billing_street",
              id: "cf__billing_street",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_street",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-6"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "billing_address",
              id: "cf__billing_address",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_address",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_city"${_scopeId}>City</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "billing_city",
              id: "cf__billing_city",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_city",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_state"${_scopeId}>State</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "billing_state",
              id: "cf__billing_state",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_state",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_zipcode"${_scopeId}>Zipcode</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "billing_zipcode",
              id: "cf__billing_zipcode",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_zipcode",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-12"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__billing_country"${_scopeId}>Country</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "billing_country" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select${ssrRenderAttrs(mergeProps(field, { id: "cf__billing_country" }))}${_scopeId2}><option value=""${_scopeId2}>Select a country</option><!--[-->`);
                  ssrRenderList(unref(countryList), (country) => {
                    _push3(`<option${ssrRenderAttr("value", country.id)}${_scopeId2}>${ssrInterpolate(country.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                } else {
                  return [
                    createVNode("select", mergeProps(field, { id: "cf__billing_country" }), [
                      createVNode("option", { value: "" }, "Select a country"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(countryList), (country) => {
                        return openBlock(), createBlock("option", {
                          value: country.id
                        }, toDisplayString(country.name), 9, ["value"]);
                      }), 256))
                    ], 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "billing_country",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></fieldset><fieldset${_scopeId}><div class="row"${_scopeId}><div class="col-8"${_scopeId}><h3${_scopeId}>Shipping address</h3></div><div class="col-4 text--right"${_scopeId}><label class="custom__checkbox"${_scopeId}><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(sameAsAbove)) ? ssrLooseContain(unref(sameAsAbove), null) : unref(sameAsAbove)) ? " checked" : ""}${_scopeId}><span class="custom__checkbox__text"${_scopeId}>Same as above</span></label></div><div class="col-6"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_street"${_scopeId}>Street</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "shipping_street",
              id: "cf__shipping_street",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_street",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-6"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_address"${_scopeId}>Address</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "shipping_address",
              id: "cf__shipping_address",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_address",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_city"${_scopeId}>City</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "shipping_city",
              id: "cf__shipping_city",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_city",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_state"${_scopeId}>State</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "shipping_state",
              id: "cf__shipping_state",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_state",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-4"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_zipcode"${_scopeId}>Zipcode</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              name: "shipping_zipcode",
              id: "cf__shipping_zipcode",
              type: "text"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_zipcode",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="col-12"${_scopeId}><div class="form__group"${_scopeId}><label for="cf__shipping_country"${_scopeId}>Country</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "shipping_country" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select${ssrRenderAttrs(mergeProps(field, { id: "cf__shipping_country" }))}${_scopeId2}><option value=""${_scopeId2}>Select a country</option><!--[-->`);
                  ssrRenderList(unref(countryList), (country) => {
                    _push3(`<option${ssrRenderAttr("value", country.id)}${_scopeId2}>${ssrInterpolate(country.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                } else {
                  return [
                    createVNode("select", mergeProps(field, { id: "cf__shipping_country" }), [
                      createVNode("option", { value: "" }, "Select a country"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(countryList), (country) => {
                        return openBlock(), createBlock("option", {
                          value: country.id
                        }, toDisplayString(country.name), 9, ["value"]);
                      }), 256))
                    ], 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "shipping_country",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></fieldset><div class="text--right"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Button, {
              type: "submit",
              permission: "create_order",
              loading: unref(isLoading)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Checkout`);
                } else {
                  return [
                    createTextVNode("Checkout")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("fieldset", null, [
                createVNode("h3", null, "Billing address"),
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-6" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_street" }, "Street"),
                      createVNode(unref(Field), {
                        name: "billing_street",
                        id: "cf__billing_street",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_street",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-6" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_address" }, "Address"),
                      createVNode(unref(Field), {
                        name: "billing_address",
                        id: "cf__billing_address",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_address",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_city" }, "City"),
                      createVNode(unref(Field), {
                        name: "billing_city",
                        id: "cf__billing_city",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_city",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_state" }, "State"),
                      createVNode(unref(Field), {
                        name: "billing_state",
                        id: "cf__billing_state",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_state",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_zipcode" }, "Zipcode"),
                      createVNode(unref(Field), {
                        name: "billing_zipcode",
                        id: "cf__billing_zipcode",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_zipcode",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__billing_country" }, "Country"),
                      createVNode(unref(Field), { name: "billing_country" }, {
                        default: withCtx(({ field }) => [
                          createVNode("select", mergeProps(field, { id: "cf__billing_country" }), [
                            createVNode("option", { value: "" }, "Select a country"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(countryList), (country) => {
                              return openBlock(), createBlock("option", {
                                value: country.id
                              }, toDisplayString(country.name), 9, ["value"]);
                            }), 256))
                          ], 16)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "billing_country",
                        class: "input--error"
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("fieldset", null, [
                createVNode("div", { class: "row" }, [
                  createVNode("div", { class: "col-8" }, [
                    createVNode("h3", null, "Shipping address")
                  ]),
                  createVNode("div", { class: "col-4 text--right" }, [
                    createVNode("label", { class: "custom__checkbox" }, [
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        "onUpdate:modelValue": ($event) => isRef(sameAsAbove) ? sameAsAbove.value = $event : null
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(sameAsAbove)]
                      ]),
                      createVNode("span", { class: "custom__checkbox__text" }, "Same as above")
                    ])
                  ]),
                  createVNode("div", { class: "col-6" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_street" }, "Street"),
                      createVNode(unref(Field), {
                        name: "shipping_street",
                        id: "cf__shipping_street",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_street",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-6" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_address" }, "Address"),
                      createVNode(unref(Field), {
                        name: "shipping_address",
                        id: "cf__shipping_address",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_address",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_city" }, "City"),
                      createVNode(unref(Field), {
                        name: "shipping_city",
                        id: "cf__shipping_city",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_city",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_state" }, "State"),
                      createVNode(unref(Field), {
                        name: "shipping_state",
                        id: "cf__shipping_state",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_state",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-4" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_zipcode" }, "Zipcode"),
                      createVNode(unref(Field), {
                        name: "shipping_zipcode",
                        id: "cf__shipping_zipcode",
                        type: "text"
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_zipcode",
                        class: "input--error"
                      })
                    ])
                  ]),
                  createVNode("div", { class: "col-12" }, [
                    createVNode("div", { class: "form__group" }, [
                      createVNode("label", { for: "cf__shipping_country" }, "Country"),
                      createVNode(unref(Field), { name: "shipping_country" }, {
                        default: withCtx(({ field }) => [
                          createVNode("select", mergeProps(field, { id: "cf__shipping_country" }), [
                            createVNode("option", { value: "" }, "Select a country"),
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(countryList), (country) => {
                              return openBlock(), createBlock("option", {
                                value: country.id
                              }, toDisplayString(country.name), 9, ["value"]);
                            }), 256))
                          ], 16)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ErrorMessage), {
                        name: "shipping_country",
                        class: "input--error"
                      })
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "text--right" }, [
                createVNode(_component_Button, {
                  type: "submit",
                  permission: "create_order",
                  loading: unref(isLoading)
                }, {
                  default: withCtx(() => [
                    createTextVNode("Checkout")
                  ]),
                  _: 1
                }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/_components/CheckoutForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=CheckoutForm-CX8XEt13.mjs.map
