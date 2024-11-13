import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { _ as _sfc_main$3 } from './Modal-Bzzq87MF.mjs';
import { useSSRContext, defineComponent, mergeModels, useModel, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, withModifiers, createTextVNode, ref, watch, unref } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Dropdown-DwiPMNDY.mjs';
import { u as useFileStorage } from './useFileStorage-CqYlcvQI.mjs';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Confirm",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    title: {},
    text: {},
    icon: { default: "mdiHelpCircle" },
    confirmText: { default: "Yes" },
    cancelText: { default: "No" }
  }, {
    "show": {
      required: true,
      default: false
    },
    "showModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirmed", "canceled"], ["update:show"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const showConfirm = useModel(__props, "show");
    const confirmAction = () => {
      emit("confirmed");
    };
    const cancelAction = () => {
      emit("canceled");
      showConfirm.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$3;
      const _component_MdiIcon = __nuxt_component_2;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        show: showConfirm.value,
        "onModal:close": cancelAction
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="confirm__dialog"${_scopeId}>`);
            if (_ctx.icon) {
              _push2(`<div class="icon__holder"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_MdiIcon, {
                icon: _ctx.icon,
                size: "64"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<h2${_scopeId}>${ssrInterpolate(_ctx.title)}</h2><div class="text__holder"${_scopeId}><p${_scopeId}>${ssrInterpolate(_ctx.text)}</p></div><div class="confirm__dialog__action"${_scopeId}><a href="#" class="btn btn__primary btn--outline"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiClose" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.cancelText)}</a><a href="#" class="btn btn__primary"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiCheck" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(_ctx.confirmText)}</a></div></div>`);
          } else {
            return [
              createVNode("div", { class: "confirm__dialog" }, [
                _ctx.icon ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "icon__holder"
                }, [
                  createVNode(_component_MdiIcon, {
                    icon: _ctx.icon,
                    size: "64"
                  }, null, 8, ["icon"])
                ])) : createCommentVNode("", true),
                createVNode("h2", null, toDisplayString(_ctx.title), 1),
                createVNode("div", { class: "text__holder" }, [
                  createVNode("p", null, toDisplayString(_ctx.text), 1)
                ]),
                createVNode("div", { class: "confirm__dialog__action" }, [
                  createVNode("a", {
                    href: "#",
                    class: "btn btn__primary btn--outline",
                    onClick: withModifiers(cancelAction, ["prevent"])
                  }, [
                    createVNode(_component_MdiIcon, { icon: "mdiClose" }),
                    createTextVNode(" " + toDisplayString(_ctx.cancelText), 1)
                  ]),
                  createVNode("a", {
                    href: "#",
                    class: "btn btn__primary",
                    onClick: withModifiers(confirmAction, ["prevent"])
                  }, [
                    createVNode(_component_MdiIcon, { icon: "mdiCheck" }),
                    createTextVNode(" " + toDisplayString(_ctx.confirmText), 1)
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Confirm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "imageBlock",
  __ssrInlineRender: true,
  props: {
    id: {},
    images: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { files, handleFileInput } = useFileStorage();
    const isLoading = ref(false);
    const showViewModal = ref(false);
    const viewImage = ref(null);
    const deleteImageID = ref(null);
    const showDeleteConfirm = ref(false);
    const loading = ref({});
    const deleteImage = async () => {
      if (deleteImageID.value) {
        loading.value[deleteImageID.value] = true;
        await $fetch(`/api/product/${props.id}/images/${deleteImageID.value}`, {
          method: "delete"
        }).then((a) => {
          if (a.status == "success") {
            emit("update");
          }
        }).finally(() => {
          if (deleteImageID.value) {
            loading.value[deleteImageID.value] = false;
            deleteImageID.value = null;
          }
        });
      }
    };
    const setAsFeatured = async (id) => {
      loading.value[id] = true;
      await $fetch(`/api/product/${props.id}/images/${id}`, {
        method: "put"
      }).then((a) => {
        if (a.status == "success") {
          emit("update");
        }
      }).finally(() => {
        loading.value[id] = false;
      });
    };
    watch(viewImage, () => {
      showViewModal.value = viewImage.value != null;
    });
    watch(deleteImageID, () => {
      showDeleteConfirm.value = deleteImageID.value != null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MdiIcon = __nuxt_component_2;
      const _component_Modal = _sfc_main$3;
      const _component_Confirm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content__body" }, _attrs))} data-v-f139f834><div class="content__block__title" data-v-f139f834><h2 data-v-f139f834>Images</h2></div><div class="image__section" data-v-f139f834><label class="custom__file" data-v-f139f834><input type="file" name="file" multiple accept="image/*" data-v-f139f834><div class="${ssrRenderClass({ "custom__file__text": true, "custom__file__text--has__files": unref(files).length > 0 })}" data-v-f139f834><ol class="custom__file__list" data-v-f139f834>`);
      if (unref(files).length > 0) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(files), (file, index) => {
          _push(`<li class="custom__file__list__item" data-v-f139f834><img${ssrRenderAttr("src", file.content)}${ssrRenderAttr("alt", file.name)} data-v-f139f834><a href="#" data-v-f139f834><span class="icon-add" data-v-f139f834></span></a></li>`);
        });
        _push(`<!--]--><li class="custom__file__list__item custom__file__list__item--last" data-v-f139f834><div class="holder" data-v-f139f834><span data-v-f139f834>You have selected ${ssrInterpolate(unref(files).length)} image${ssrInterpolate(unref(files).length > 1 ? "s" : "")}</span><button class="${ssrRenderClass({ "btn btn__primary": true, "loading": unref(isLoading) })}" data-v-f139f834> save images </button></div></li><!--]-->`);
      } else {
        _push(`<li class="custom__file__list__item" data-v-f139f834><strong data-v-f139f834>Upload files</strong><em data-v-f139f834>(You can choose multiple images)</em></li>`);
      }
      _push(`</ol></div></label><div class="image__list" data-v-f139f834><!--[-->`);
      ssrRenderList(_ctx.images, (image) => {
        var _a;
        _push(`<figure class="${ssrRenderClass({ "image": true, "image--featured": image.featured })}" data-v-f139f834><img${ssrRenderAttr("src", (_a = image.images) == null ? void 0 : _a.url)} alt="image description" data-v-f139f834><div class="image__action" data-v-f139f834>`);
        if (image.featured) {
          _push(`<span class="image__action__item" data-v-f139f834>`);
          _push(ssrRenderComponent(_component_MdiIcon, {
            icon: "mdiStar",
            class: "featured--icon text--warning"
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$2, { as: "ul" }, {
          opener: withCtx(({ clickHandler }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<a href="#" class="${ssrRenderClass({ "dropdown__opener image__action__item image__action__item--link": true, "loading": unref(loading)[image.id] })}" data-v-f139f834${_scopeId}>`);
              if (!unref(loading)[image.id]) {
                _push2(ssrRenderComponent(_component_MdiIcon, {
                  icon: "mdiDotsVertical",
                  size: "24"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</a>`);
            } else {
              return [
                createVNode("a", {
                  href: "#",
                  class: { "dropdown__opener image__action__item image__action__item--link": true, "loading": unref(loading)[image.id] },
                  onClick: withModifiers(clickHandler, ["prevent"])
                }, [
                  !unref(loading)[image.id] ? (openBlock(), createBlock(_component_MdiIcon, {
                    key: 0,
                    icon: "mdiDotsVertical",
                    size: "24"
                  })) : createCommentVNode("", true)
                ], 10, ["onClick"])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<li data-v-f139f834${_scopeId}><a href="#" data-v-f139f834${_scopeId}> Delete `);
              _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiTrashCan" }, null, _parent2, _scopeId));
              _push2(`</a></li><li data-v-f139f834${_scopeId}><a href="#" data-v-f139f834${_scopeId}> view `);
              _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiEye" }, null, _parent2, _scopeId));
              _push2(`</a></li>`);
              if (!image.featured) {
                _push2(`<li data-v-f139f834${_scopeId}><a href="#" data-v-f139f834${_scopeId}> Set as featured `);
                _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiStarCircleOutline" }, null, _parent2, _scopeId));
                _push2(`</a></li>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                createVNode("li", null, [
                  createVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => deleteImageID.value = image.id, ["prevent"])
                  }, [
                    createTextVNode(" Delete "),
                    createVNode(_component_MdiIcon, { icon: "mdiTrashCan" })
                  ], 8, ["onClick"])
                ]),
                createVNode("li", null, [
                  createVNode("a", {
                    href: "#",
                    onClick: ($event) => {
                      var _a2;
                      return viewImage.value = (_a2 = image.images) == null ? void 0 : _a2.url;
                    }
                  }, [
                    createTextVNode(" view "),
                    createVNode(_component_MdiIcon, { icon: "mdiEye" })
                  ], 8, ["onClick"])
                ]),
                !image.featured ? (openBlock(), createBlock("li", { key: 0 }, [
                  createVNode("a", {
                    href: "#",
                    onClick: withModifiers(($event) => setAsFeatured(image.id), ["prevent"])
                  }, [
                    createTextVNode(" Set as featured "),
                    createVNode(_component_MdiIcon, { icon: "mdiStarCircleOutline" })
                  ], 8, ["onClick"])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></figure>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_Modal, {
        show: unref(showViewModal),
        size: "xl",
        "onModal:close": ($event) => viewImage.value = null
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(viewImage)) {
              _push2(`<div class="image__holder" data-v-f139f834${_scopeId}><img${ssrRenderAttr("src", unref(viewImage))} alt="image description" data-v-f139f834${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(viewImage) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "image__holder"
              }, [
                createVNode("img", {
                  src: unref(viewImage),
                  alt: "image description"
                }, null, 8, ["src"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Confirm, {
        show: unref(showDeleteConfirm),
        title: "Are you sure you want to delete?",
        text: "Once you delete this image you cannot go back.",
        onConfirmed: deleteImage,
        onCanceled: ($event) => deleteImageID.value = null,
        "cancel-text": "No, not now",
        "confirm-text": "Yes, delete it"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/_component/imageBlock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ImageBlock = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f139f834"]]);

export { ImageBlock as default };
//# sourceMappingURL=imageBlock-NOgw2wZw.mjs.map
