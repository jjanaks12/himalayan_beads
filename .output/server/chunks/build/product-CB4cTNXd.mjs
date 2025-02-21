import { Prisma } from '@prisma/client';
import { d as defineStore } from './server.mjs';
import { d as debounce } from './debounce-Bvemo6-u.mjs';
import { ref, computed, watch } from 'vue';

Prisma.validator()({
  include: {
    category: true,
    prices: true,
    images: {
      include: {
        images: true
      }
    },
    stock: true
  }
});
Prisma.validator()({
  include: { images: true }
});
const useProductStore = defineStore("product", () => {
  const isLoading = ref(false);
  const param = ref();
  const query = ref({
    per_page: 20,
    current: 1,
    s: ""
  });
  const fetchProduct = async () => {
    isLoading.value = true;
    const productResponse = await $fetch("/api/product", { query: query.value });
    if (productResponse.status == "success") {
      param.value = productResponse.data;
    }
    isLoading.value = false;
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
  const nextPage = () => {
    var _a, _b;
    const current = Math.min((_a = param.value) == null ? void 0 : _a.total_page, query.value.current + 1);
    if (current != ((_b = param.value) == null ? void 0 : _b.current))
      query.value = { ...query.value, current };
  };
  const prevPage = () => {
    var _a;
    const current = Math.max(0, query.value.current - 1);
    if (current != ((_a = param.value) == null ? void 0 : _a.current))
      query.value = { ...query.value, current };
  };
  const gotoPage = (page_no) => {
    var _a;
    const newPage = Math.min(((_a = param.value) == null ? void 0 : _a.total_page) || 0, Math.max(0, page_no));
    if (query.value.current != newPage)
      query.value = { ...query.value, current: newPage };
  };
  const productList = computed(() => {
    var _a;
    return (_a = param.value) == null ? void 0 : _a.data;
  });
  watch(query, () => {
    debounce(() => {
      fetchProduct();
    }, 500);
  }, {
    deep: true,
    immediate: true
  });
  return { fetchProduct, saveProduct, nextPage, prevPage, gotoPage, productList, isLoading, param, query };
});

export { useProductStore as u };
//# sourceMappingURL=product-CB4cTNXd.mjs.map
