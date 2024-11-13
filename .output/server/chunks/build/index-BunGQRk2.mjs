import { _ as __nuxt_component_2 } from './MdiIcon-DU05I9i6.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Modal-Bzzq87MF.mjs';
import _sfc_main$2 from './form-D7QrsIfQ.mjs';
import './server.mjs';
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
import './debounce-Bvemo6-u.mjs';
import 'vee-validate';
import './product.schema-HEldBoIJ.mjs';
import 'yup';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    prices: {}
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const showAddModal = ref(false);
    const onSubmit = () => {
      showAddModal.value = false;
      emit("update");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_MdiIcon = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content__block" }, _attrs))}><div class="content__block__title"><h2>Rates</h2>`);
      if (((_a = _ctx.prices) == null ? void 0 : _a.length) == 0) {
        _push(`<a href="#" class="btn btn__primary btn--outline">`);
        _push(ssrRenderComponent(_component_MdiIcon, {
          icon: "mdiPlus",
          size: "24"
        }, null, _parent));
        _push(` Add Rate </a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="datatable__body"><table><thead><th class="sn"></th><th class="text--left">Amount</th><th></th></thead><tbody><!--[-->`);
      ssrRenderList(_ctx.prices, (price, index) => {
        _push(`<tr><td class="sn">${ssrInterpolate(index + 1)}</td><td>$${ssrInterpolate(price.price.amount)}</td><td class="text--right"><a class="btn btn--xs btn__info" href="#">`);
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
      _push(ssrRenderComponent(_sfc_main$1, {
        show: unref(showAddModal),
        "onModal:close": ($event) => showAddModal.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { onUpdate: onSubmit }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { onUpdate: onSubmit })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product/_component/rate/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BunGQRk2.mjs.map
