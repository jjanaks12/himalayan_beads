import { _ as __nuxt_component_0 } from './nuxt-link-Dz_gd_31.mjs';
import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import ImageBlock from './imageBlock-NOgw2wZw.mjs';
import _sfc_main$2 from './productDescription-BRDBFrwd.mjs';
import _sfc_main$1 from './index-BunGQRk2.mjs';
import { u as useHead } from './index-BabADJUJ.mjs';
import { a as useRoute } from './server.mjs';
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
import './Modal-Bzzq87MF.mjs';
import './debounce-Bvemo6-u.mjs';
import './Dropdown-DwiPMNDY.mjs';
import './useFileStorage-CqYlcvQI.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './TiptapEditor-D3R8Fbvz.mjs';
import '@tiptap/extension-underline';
import '@tiptap/pm/state';
import '@tiptap/pm/model';
import '@tiptap/pm/transform';
import '@tiptap/pm/commands';
import '@tiptap/pm/schema-list';
import '@tiptap/pm/history';
import './form-D7QrsIfQ.mjs';
import 'vee-validate';
import './product.schema-HEldBoIJ.mjs';
import 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Products :: Himalayan Beads"
    });
    const route = useRoute();
    const product = ref();
    const fetchProductDetail = () => {
      $fetch("/api/product/" + route.params.id).then((data) => {
        if (data.status == "success") {
          product.value = data.data;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_nuxt_link = __nuxt_component_0;
      const _component_MdiIcon = __nuxt_component_2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "content__section" }, _attrs))}><header class="content__header"><div class="content__header__holder"><h1>${ssrInterpolate((_a = unref(product)) == null ? void 0 : _a.name)}</h1><em>${ssrInterpolate((_c = (_b = unref(product)) == null ? void 0 : _b.category) == null ? void 0 : _c.name)}</em></div><div class="content__header__action">`);
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
      if (unref(product)) {
        _push(ssrRenderComponent(ImageBlock, {
          id: unref(product).id,
          images: unref(product).images,
          onUpdate: fetchProductDetail
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1, {
        prices: (_d = unref(product)) == null ? void 0 : _d.prices,
        onUpdate: fetchProductDetail
      }, null, _parent));
      if (unref(product)) {
        _push(ssrRenderComponent(_sfc_main$2, {
          product: unref(product),
          onUpdate: fetchProductDetail
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=_id_-hznKRKbG.mjs.map
