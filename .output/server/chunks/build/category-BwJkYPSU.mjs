import { useSSRContext, defineComponent, ref, computed, watch, mergeProps, unref, isRef, withCtx, createVNode, mergeModels, useModel, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderTeleport, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import moment from 'moment';
import { Prisma } from '@prisma/client';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import { u as useHead } from './index-BabADJUJ.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const formatDate = (date, format = "YYYY/MM/DD hh:mm a") => moment(date).format(format);
Prisma.validator()({
  include: { predecessor: true }
});
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
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    "show": {
      required: true,
      default: false
    },
    "showModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["modal:close"], ["update:show"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const modal = ref();
    const isActive = useModel(__props, "show");
    const closeModal = () => {
      isActive.value = false;
      emit("modal:close");
    };
    const clickOnOutside = (event) => {
      if (isActive.value) {
        if (!modal.value.contains(event.target)) {
          event.preventDefault();
          event.stopPropagation();
          closeModal();
        }
      }
    };
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
        _push2(`<section class="${ssrRenderClass({ "modal": true, "modal--active": isActive.value })}"><div class="modal__content"><a href="#" class="modal__close"><span class="icon-add"></span></a>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        _push2(`</div></section>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const categorySchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description")
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FileUpload",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    name: {},
    label: {},
    accepts: {},
    multiple: { type: Boolean }
  }, {
    "files": {
      default: []
    },
    "filesModifiers": {}
  }),
  emits: ["update:files"],
  setup(__props) {
    const fileList = useModel(__props, "files");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form__group" }, _attrs))}><label class="custom__file"><input type="file"${ssrRenderAttr("name", _ctx.name)}${ssrIncludeBooleanAttr(_ctx.multiple) ? " multiple" : ""}><div class="custom__file__text">`);
      if (fileList.value.length == 0) {
        _push(`<span>${ssrInterpolate(_ctx.label)}</span>`);
      } else {
        _push(`<div class="text--left">`);
        if (_ctx.multiple) {
          _push(`<!--[--><strong>Selected files (${ssrInterpolate(fileList.value.length)})</strong><ol class="custom__file__list"><!--[-->`);
          ssrRenderList(fileList.value, (file, index) => {
            _push(`<li class="custom__file__list__item">${ssrInterpolate(file.name)} <a href="#"><span class="icon-add"></span></a></li>`);
          });
          _push(`<!--]--></ol><!--]-->`);
        } else {
          _push(`<span class="custom__file__list__item">${ssrInterpolate(fileList.value[0].name)} <a href="#"><span class="icon-add"></span></a></span>`);
        }
        _push(`</div>`);
      }
      _push(`</div></label></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FileUpload.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
    const form = ref();
    const files = ref([]);
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              name: "file",
              label: "Category Image",
              files: unref(files),
              "onUpdate:files": ($event) => isRef(files) ? files.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(`<div class="form__group"${_scopeId}><label for="cf__parent_category"${_scopeId}>Parent category</label>`);
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
              createVNode(_sfc_main$3, {
                name: "file",
                label: "Category Image",
                files: unref(files),
                "onUpdate:files": ($event) => isRef(files) ? files.value = $event : null
              }, null, 8, ["files", "onUpdate:files"]),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/category/form.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Alert.vue");
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
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Product category</h1></div><div class="datatable__header__action"><a class="btn btn__primary" href="#"><span class="prepend-icon icon-add"></span> Add Category </a></div></header><div class="datatable__body"><table><thead><tr><th></th><th>Name</th><th>Created at</th><th class="text--right">Action</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(categoryList), (category, index) => {
        _push(`<!--[--><tr><td class="sn">${ssrInterpolate(index + 1)}</td><td class="text--center">${ssrInterpolate(category.name)}</td><td class="text--center">${ssrInterpolate(unref(formatDate)(category.createdAt))}</td><td class="text--right"><a class="btn btn--xs btn__info" href="#"><span class="prepend-icon icon-edit"></span> Edit </a><a class="btn btn--xs btn__danger" href="#"><span class="prepend-icon icon-trash"></span> Delete </a>`);
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
      _push(ssrRenderComponent(_sfc_main$4, {
        show: unref(showForm),
        "onUpdate:show": ($event) => isRef(showForm) ? showForm.value = $event : null,
        "onModal:close": ($event) => editCategory.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              category: unref(editCategory) || null,
              onUpdateForm: () => {
                showForm.value = false;
                unref(fetchCategory)();
              }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
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
      _push(ssrRenderComponent(_sfc_main$1, {
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
//# sourceMappingURL=category-BwJkYPSU.mjs.map
