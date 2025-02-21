import { defineComponent, mergeProps, unref, useSSRContext, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { f as formatDate } from './filter-ohuO8Bwv.mjs';
import { s as storeToRefs, d as defineStore } from './server.mjs';
import { u as useHead } from './index-CCqbQxu4.mjs';
import 'moment';
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

const useOrderStore = defineStore("order", () => {
  const list = ref([]);
  const fetch = async () => {
    const orders = await $fetch("/api/order");
    list.value = orders;
  };
  return { list, fetch };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "myOrder",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "My Order :: Himalayan Beads"
    });
    const { list } = storeToRefs(useOrderStore());
    useOrderStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "datatable__section" }, _attrs))}><header class="datatable__header"><div class="datatable__header__holder"><h1>Order</h1></div><div class="datatable__header__action"></div></header><div class="datatable__body"><table><thead><tr><th></th><th class="text--left">Order</th><th>Ordered at</th><th class="text--right">Status</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(list), (order, index) => {
        _push(`<tr><td>${ssrInterpolate(index + 1)}</td><td><address><strong>${ssrInterpolate(order.shippingAddress.address)}</strong><em class="d-block">${ssrInterpolate(order.shippingAddress.street)}, ${ssrInterpolate(order.shippingAddress.city)}, ${ssrInterpolate(order.shippingAddress.zipCode)}, ${ssrInterpolate(order.shippingAddress.country.name)}</em></address></td><td>${ssrInterpolate(unref(formatDate)(order.createdAt))}</td><td class="text--right"><span class="badge badge--info">${ssrInterpolate(order.status)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/myOrder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=myOrder-DsihOUum.mjs.map
