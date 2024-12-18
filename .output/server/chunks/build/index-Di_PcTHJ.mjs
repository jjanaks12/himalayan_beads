import { _ as __nuxt_component_1 } from './MdiIcon-DoZof0z_.mjs';
import { useSSRContext, defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import _sfc_main$2 from './Item-BlgEb0Dk.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { a as productSchema } from './product.schema-HEldBoIJ.mjs';
import { _ as _sfc_main$4, u as useProductCategoryStore } from './Alert-C3whoaLR.mjs';
import { _ as _sfc_main$3 } from './Modal-Bzzq87MF.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
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
import 'moment';
import './nuxt-link-BAlVYdW3.mjs';
import 'yup';
import './debounce-Bvemo6-u.mjs';

const useProductStore = defineStore("product", () => {
  const productList = ref([]);
  const fetchProduct = async () => {
    const a = await $fetch("/api/product");
    if (a.status == "success")
      productList.value = a.data;
  };
  const saveProduct = (values) => new Promise((resolve, reject) => {
    {
      $fetch("/api/product", {
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
  return { fetchProduct, saveProduct, productList };
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["update-form"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useProductCategoryStore();
    const { categoryList } = storeToRefs(useProductCategoryStore());
    const { saveProduct } = useProductStore();
    const form = ref();
    const isLoading = ref(false);
    const formSubmit = (values, { resetForm }) => {
      isLoading.value = true;
      saveProduct({ ...values }).then(() => {
        emit("update-form");
        resetForm();
      }).finally(() => {
        isLoading.value = false;
      });
    };
    const initializeForm = () => {
      var _a, _b, _c, _d, _e, _f;
      (_a = form.value) == null ? void 0 : _a.resetForm();
      if (props.product) {
        (_c = form.value) == null ? void 0 : _c.setFieldValue("id", (_b = props.product) == null ? void 0 : _b.id);
        (_d = form.value) == null ? void 0 : _d.setFieldValue("name", props.product.name);
        (_e = form.value) == null ? void 0 : _e.setFieldValue("description", props.product.description || "");
        (_f = form.value) == null ? void 0 : _f.setFieldValue("category_id", props.product.category_id || "");
      }
    };
    watch(props, () => {
      initializeForm();
    }, {
      deep: true,
      immediate: true
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Form), mergeProps({
        class: "form",
        "validation-schema": unref(productSchema),
        onSubmit: formSubmit,
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="form__group"${_scopeId}><label for="pf__name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "text",
              name: "name",
              id: "pf__name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              name: "name",
              class: "input--error"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="cf__category_id"${_scopeId}>Category</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "category_id" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select${ssrRenderAttrs(mergeProps(field, { id: "cf__category_id" }))}${_scopeId2}><option value=""${_scopeId2}>Select a parent</option><!--[-->`);
                  ssrRenderList(unref(categoryList), (category) => {
                    _push3(`<!--[--><option${ssrRenderAttr("value", category.id)}${_scopeId2}>${ssrInterpolate(category.name)}</option>`);
                    if (category.predecessor.length > 0) {
                      _push3(`<!--[-->`);
                      ssrRenderList(category.predecessor, (subCategory) => {
                        _push3(`<option${ssrRenderAttr("value", subCategory.id)}${_scopeId2}>\xA0\xA0 ${ssrInterpolate(subCategory.name)}</option>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]--></select>`);
                } else {
                  return [
                    createVNode("select", mergeProps(field, { id: "cf__category_id" }), [
                      createVNode("option", { value: "" }, "Select a parent"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryList), (category) => {
                        return openBlock(), createBlock(Fragment, null, [
                          createVNode("option", {
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]),
                          category.predecessor.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(category.predecessor, (subCategory) => {
                            return openBlock(), createBlock("option", {
                              value: subCategory.id
                            }, "\xA0\xA0 " + toDisplayString(subCategory.name), 9, ["value"]);
                          }), 256)) : createCommentVNode("", true)
                        ], 64);
                      }), 256))
                    ], 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "category_id"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Save</button></div>`);
          } else {
            return [
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "pf__name" }, "Name"),
                createVNode(unref(Field), {
                  type: "text",
                  name: "name",
                  id: "pf__name"
                }),
                createVNode(unref(ErrorMessage), {
                  name: "name",
                  class: "input--error"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "cf__category_id" }, "Category"),
                createVNode(unref(Field), { name: "category_id" }, {
                  default: withCtx(({ field }) => [
                    createVNode("select", mergeProps(field, { id: "cf__category_id" }), [
                      createVNode("option", { value: "" }, "Select a parent"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryList), (category) => {
                        return openBlock(), createBlock(Fragment, null, [
                          createVNode("option", {
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]),
                          category.predecessor.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(category.predecessor, (subCategory) => {
                            return openBlock(), createBlock("option", {
                              value: subCategory.id
                            }, "\xA0\xA0 " + toDisplayString(subCategory.name), 9, ["value"]);
                          }), 256)) : createCommentVNode("", true)
                        ], 64);
                      }), 256))
                    ], 16)
                  ]),
                  _: 1
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "category_id"
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Products :: Himalayan Beads"
    });
    const { fetchProduct } = useProductStore();
    const { productList } = storeToRefs(useProductStore());
    const isDeleting = ref(false);
    const showForm = ref(false);
    const editProduct = ref(null);
    const deletingProduct = ref(null);
    const showDeleteAlert = computed(() => deletingProduct.value != null);
    const deleteProduct = async () => {
      var _a;
      isDeleting.value = true;
      await $fetch(`/api/category/${(_a = deletingProduct.value) == null ? void 0 : _a.id}/`, {
        method: "DELETE"
      }).then(() => {
        deletingProduct.value = null;
        fetchProduct();
      }).finally(() => {
        isDeleting.value = false;
      });
    };
    watch(editProduct, () => {
      if (editProduct.value)
        showForm.value = true;
      else
        showForm.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MdiIcon = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Product</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Product </a></div></header><div class="datatable__filter"><form action="#" class="search__form"></form></div><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(productList), (product, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td>`);
        _push(ssrRenderComponent(_sfc_main$2, { product }, null, _parent));
        _push(`</td><td class="text--center">${ssrInterpolate(unref(formatDate)(product.createdAt))}</td><td class="text--right"><a class="btn btn--xs btn__info" href="#">`);
        _push(ssrRenderComponent(_component_MdiIcon, {
          icon: "mdiPencil",
          size: "16"
        }, null, _parent));
        _push(` Edit </a><a class="btn btn--xs btn__danger" href="#">`);
        _push(ssrRenderComponent(_component_MdiIcon, {
          icon: "mdiDelete",
          size: "16"
        }, null, _parent));
        _push(` Delete </a></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        show: unref(showForm),
        "onUpdate:show": ($event) => isRef(showForm) ? showForm.value = $event : null,
        "onModal:close": ($event) => editProduct.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              product: unref(editProduct) || null,
              onUpdateForm: () => {
                showForm.value = false;
                unref(fetchProduct)();
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                product: unref(editProduct) || null,
                onUpdateForm: () => {
                  showForm.value = false;
                  unref(fetchProduct)();
                }
              }, null, 8, ["product", "onUpdateForm"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        title: "Are you sure you want delete?",
        show: unref(showDeleteAlert),
        "onUpdate:show": ($event) => isRef(showDeleteAlert) ? showDeleteAlert.value = $event : null,
        loading: unref(isDeleting),
        "onUpdate:loading": ($event) => isRef(isDeleting) ? isDeleting.value = $event : null,
        onCancel: () => {
          deletingProduct.value = null;
        },
        onConfirm: deleteProduct
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quo, explicabo necessitatibus laboriosam a voluptatem hic ratione eius excepturi doloremque quidem odit eaque blanditiis illo obcaecati. Dicta adipisci accusantium quidem.</p>`);
          } else {
            return [
              createVNode("p", null, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quo, explicabo necessitatibus laboriosam a voluptatem hic ratione eius excepturi doloremque quidem odit eaque blanditiis illo obcaecati. Dicta adipisci accusantium quidem.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Di_PcTHJ.mjs.map
