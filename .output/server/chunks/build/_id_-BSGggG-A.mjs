import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './TiptapEditor-H9JzcDt2.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import { a as useRoute } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'requrl';
import 'node:url';
import '@tiptap/extension-underline';
import '@tiptap/pm/state';
import '@tiptap/pm/model';
import '@tiptap/pm/transform';
import '@tiptap/pm/commands';
import '@tiptap/pm/schema-list';
import '@tiptap/pm/history';
import '@unhead/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Products :: Himalayan Beads"
    });
    useRoute();
    const product = ref();
    const productDescription = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_MdiIcon = __nuxt_component_2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "content__section" }, _attrs))}><header class="content__header"><div class="content__header__holder"><h1>${ssrInterpolate((_a = unref(product)) == null ? void 0 : _a.name)}</h1></div><div class="content__header__action">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        class: "btn btn__primary",
        to: "/dashboard/product"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_MdiIcon, { icon: "mdiReply" }, null, _parent2, _scopeId));
            _push2(` Back `);
          } else {
            return [
              createVNode(_component_MdiIcon, { icon: "mdiReply" }),
              createTextVNode(" Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><div class="content__body">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        modelValue: unref(productDescription),
        "onUpdate:modelValue": ($event) => isRef(productDescription) ? productDescription.value = $event : null
      }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BSGggG-A.mjs.map
