import { useSSRContext, defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { u as useProductCategoryStore, _ as _sfc_main$3 } from './Alert-BFwN_TCd.mjs';
import { _ as _sfc_main$2 } from './Modal-Bzzq87MF.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { s as storeToRefs } from './server.mjs';
import { u as useFileStorage } from './useFileStorage-CqYlcvQI.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import 'moment';
import '@prisma/client';
import './debounce-Bvemo6-u.mjs';
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

const categorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description")
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "form",
  __ssrInlineRender: true,
  props: {
    category: {}
  },
  emits: ["update-form"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { saveCategory } = useProductCategoryStore();
    const { categoryList } = storeToRefs(useProductCategoryStore());
    const { files, handleFileInput } = useFileStorage();
    const form = ref();
    const isLoading = ref(false);
    const submitHandler = (values, { resetForm }) => {
      isLoading.value = true;
      saveCategory({ ...values, files: files.value }).then(() => {
        emit("update-form");
        resetForm();
      }).finally(() => {
        isLoading.value = false;
      });
    };
    const initializeForm = () => {
      var _a, _b, _c, _d, _e;
      (_a = form.value) == null ? void 0 : _a.resetForm();
      if (props.category) {
        (_b = form.value) == null ? void 0 : _b.setFieldValue("id", props.category.id);
        (_c = form.value) == null ? void 0 : _c.setFieldValue("name", props.category.name);
        (_d = form.value) == null ? void 0 : _d.setFieldValue("description", props.category.description || "");
        (_e = form.value) == null ? void 0 : _e.setFieldValue("parent_category", props.category.parent_id || "");
        files.value = [];
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
        class: "category__form",
        action: "#",
        "validation-schema": unref(categorySchema),
        onSubmit: submitHandler,
        ref_key: "form",
        ref: form
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.category) {
              _push2(ssrRenderComponent(unref(Field), {
                type: "hidden",
                name: "id"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="form__group"${_scopeId}><label for="cf__name"${_scopeId}>Name</label>`);
            _push2(ssrRenderComponent(unref(Field), {
              type: "text",
              name: "name",
              id: "cf__name",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "name"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label for="cf__description"${_scopeId}>Description</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "description" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<textarea${ssrRenderAttrs(_temp0 = mergeProps(field, { id: "cf__description" }), "textarea")}${_scopeId2}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
                } else {
                  return [
                    createVNode("textarea", mergeProps(field, { id: "cf__description" }), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "description"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="form__group"${_scopeId}><label class="custom__file"${_scopeId}><input type="file" name="file" accept="image/*"${_scopeId}><div class="custom__file__text"${_scopeId}><ol class="custom__file__list"${_scopeId}>`);
            if (unref(files).length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(files), (file, index) => {
                _push2(`<li class="custom__file__list__item"${_scopeId}><img${ssrRenderAttr("src", file.content)}${ssrRenderAttr("alt", file.name)}${_scopeId}><a href="#"${_scopeId}><span class="icon-add"${_scopeId}></span></a></li>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<span class="custom__file__list__item"${_scopeId}><strong${_scopeId}>Select a file</strong></span>`);
            }
            _push2(`</ol></div></label></div><div class="form__group"${_scopeId}><label for="cf__parent_category"${_scopeId}>Parent category</label>`);
            _push2(ssrRenderComponent(unref(Field), { name: "parent_category" }, {
              default: withCtx(({ field }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<select${ssrRenderAttrs(mergeProps(field, { id: "cf__parent_category" }))}${_scopeId2}><option value=""${_scopeId2}>Select a parent</option><!--[-->`);
                  ssrRenderList(unref(categoryList), (category) => {
                    _push3(`<option${ssrRenderAttr("value", category.id)}${_scopeId2}>${ssrInterpolate(category.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                } else {
                  return [
                    createVNode("select", mergeProps(field, { id: "cf__parent_category" }), [
                      createVNode("option", { value: "" }, "Select a parent"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryList), (category) => {
                        return openBlock(), createBlock("option", {
                          value: category.id
                        }, toDisplayString(category.name), 9, ["value"]);
                      }), 256))
                    ], 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ErrorMessage), {
              class: "input--error",
              name: "parent_category"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="text--right"${_scopeId}><button type="submit" class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}"${_scopeId}>Save</button></div>`);
          } else {
            return [
              props.category ? (openBlock(), createBlock(unref(Field), {
                key: 0,
                type: "hidden",
                name: "id"
              })) : createCommentVNode("", true),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "cf__name" }, "Name"),
                createVNode(unref(Field), {
                  type: "text",
                  name: "name",
                  id: "cf__name",
                  autocomplete: "name"
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "name"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "cf__description" }, "Description"),
                createVNode(unref(Field), { name: "description" }, {
                  default: withCtx(({ field }) => [
                    createVNode("textarea", mergeProps(field, { id: "cf__description" }), null, 16)
                  ]),
                  _: 1
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "description"
                })
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { class: "custom__file" }, [
                  createVNode("input", {
                    type: "file",
                    onChange: unref(handleFileInput),
                    name: "file",
                    accept: "image/*"
                  }, null, 40, ["onChange"]),
                  createVNode("div", { class: "custom__file__text" }, [
                    createVNode("ol", { class: "custom__file__list" }, [
                      unref(files).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(files), (file, index) => {
                        return openBlock(), createBlock("li", { class: "custom__file__list__item" }, [
                          createVNode("img", {
                            src: file.content,
                            alt: file.name
                          }, null, 8, ["src", "alt"]),
                          createVNode("a", {
                            href: "#",
                            onClick: withModifiers(($event) => unref(files).splice(index, 1), ["prevent"])
                          }, [
                            createVNode("span", { class: "icon-add" })
                          ], 8, ["onClick"])
                        ]);
                      }), 256)) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "custom__file__list__item"
                      }, [
                        createVNode("strong", null, "Select a file")
                      ]))
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "form__group" }, [
                createVNode("label", { for: "cf__parent_category" }, "Parent category"),
                createVNode(unref(Field), { name: "parent_category" }, {
                  default: withCtx(({ field }) => [
                    createVNode("select", mergeProps(field, { id: "cf__parent_category" }), [
                      createVNode("option", { value: "" }, "Select a parent"),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryList), (category) => {
                        return openBlock(), createBlock("option", {
                          value: category.id
                        }, toDisplayString(category.name), 9, ["value"]);
                      }), 256))
                    ], 16)
                  ]),
                  _: 1
                }),
                createVNode(unref(ErrorMessage), {
                  class: "input--error",
                  name: "parent_category"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/category/form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "category",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Category :: Himalayan Beads"
    });
    const { categoryList } = storeToRefs(useProductCategoryStore());
    const { fetchCategory } = useProductCategoryStore();
    const showForm = ref(false);
    const isDeleting = ref(false);
    const toggleAccordion = ref({});
    const editCategory = ref(null);
    const deletingCategory = ref(null);
    const deleteCategory = () => {
      var _a;
      isDeleting.value = true;
      $fetch(`/api/category/${(_a = deletingCategory.value) == null ? void 0 : _a.id}/`, {
        method: "DELETE"
      }).then(() => {
        deletingCategory.value = null;
        fetchCategory();
      }).finally(() => {
        isDeleting.value = false;
      });
    };
    const showDeleteAlert = computed(() => deletingCategory.value != null);
    watch(editCategory, () => {
      if (editCategory.value)
        showForm.value = true;
      else
        showForm.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Product category</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Category </a></div></header><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(categoryList), (category, index) => {
        var _a;
        _push(`<!--[--><tr><td class="sn">${ssrInterpolate(index + 1)}</td><td><div class="wrap">`);
        if (category.image) {
          _push(`<figure class="image"><img${ssrRenderAttr("src", ((_a = category.image) == null ? void 0 : _a.url) || "")}${ssrRenderAttr("alt", category.name)}></figure>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="holder"><strong class="title">${ssrInterpolate(category.name)}</strong></div></div></td><td class="text--center nowrap">${ssrInterpolate(unref(formatDate)(category.createdAt))}</td><td class="text--right nowrap"><a class="btn btn--xs btn__info" href="#"><span class="prepend-icon icon-edit"></span> Edit </a><a class="btn btn--xs btn__danger" href="#"><span class="prepend-icon icon-trash"></span> Delete </a>`);
        if ((category == null ? void 0 : category.predecessor.length) > 0) {
          _push(`<a href="#" class="btn btn--xs btn__primary btn--outline">`);
          if (unref(toggleAccordion)[category.id]) {
            _push(`<span class="icon-caret-d"></span>`);
          } else {
            _push(`<span class="icon-caret-t"></span>`);
          }
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td></tr>`);
        if ((category == null ? void 0 : category.predecessor.length) > 0 && unref(toggleAccordion)[category.id]) {
          _push(`<tr><td colspan="4" class="no--spacing"><table class="subtable"><tbody><!--[-->`);
          ssrRenderList(category.predecessor, (subCategory, counter) => {
            _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}.${ssrInterpolate(counter + 1)}</td><td class="text--center">${ssrInterpolate(subCategory.name)}</td><td>${ssrInterpolate(unref(formatDate)(subCategory.createdAt))}</td><td class="text--right"><a class="btn btn--xs btn__info" href="#"><span class="prepend-icon icon-edit"></span> Edit </a><a class="btn btn--xs btn__danger" href="#"><span class="prepend-icon icon-trash"></span> Delete </a></td></tr>`);
          });
          _push(`<!--]--></tbody></table></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></tbody></table></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        show: unref(showForm),
        "onUpdate:show": ($event) => isRef(showForm) ? showForm.value = $event : null,
        "onModal:close": ($event) => editCategory.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              category: unref(editCategory) || null,
              onUpdateForm: () => {
                showForm.value = false;
                unref(fetchCategory)();
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                category: unref(editCategory) || null,
                onUpdateForm: () => {
                  showForm.value = false;
                  unref(fetchCategory)();
                }
              }, null, 8, ["category", "onUpdateForm"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        title: "Are you sure you want delete?",
        show: unref(showDeleteAlert),
        "onUpdate:show": ($event) => isRef(showDeleteAlert) ? showDeleteAlert.value = $event : null,
        loading: unref(isDeleting),
        "onUpdate:loading": ($event) => isRef(isDeleting) ? isDeleting.value = $event : null,
        onCancel: () => {
          deletingCategory.value = null;
        },
        onConfirm: deleteCategory
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/category.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=category-BYXetRHw.mjs.map
