import { defineComponent, useSSRContext, ref } from 'vue';
import { d as defineStore } from './server.mjs';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const useProductStore = defineStore("product", () => {
  const productList = ref([]);
  const fetchProduct = async () => {
    const a = await $fetch("/api/product");
    if (a.status == "success")
      productList.value = a.data;
  };
  return { fetchProduct };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "product",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Products :: Himalayan Beads"
    });
    useProductStore();
    return (_ctx, _push, _parent, _attrs) => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/product.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=product-DHgmEbEl.mjs.map
