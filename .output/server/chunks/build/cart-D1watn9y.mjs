import { d as defineStore, p as persistedState } from './server.mjs';
import { ref } from 'vue';

const useCartStore = defineStore("cart", () => {
  const list = ref([]);
  const isLoading = ref(false);
  const addToCart = ({ prices, ...product }) => {
    list.value.push({
      product: {
        ...product,
        prices,
        rate: prices[prices.length - 1].price
      },
      quantity: 1
    });
  };
  const removeFromCart = (product_id) => {
    const ci = list.value.find((cartItem) => {
      var _a;
      return ((_a = cartItem == null ? void 0 : cartItem.product) == null ? void 0 : _a.id) === product_id;
    });
    const index = list.value.indexOf(ci);
    if (index >= 0)
      list.value.splice(index, 1);
  };
  const isInCart = (product_id) => {
    const ci = list.value.find((cartItem) => {
      var _a;
      return ((_a = cartItem == null ? void 0 : cartItem.product) == null ? void 0 : _a.id) === product_id;
    });
    return ci != null;
  };
  const checkout = async () => {
    isLoading.value = true;
    await $fetch("/api/cart/checkout", {
      method: "POST",
      body: list.value
    }).finally(() => {
      isLoading.value = false;
    });
  };
  return { list, isLoading, addToCart, removeFromCart, isInCart, checkout };
}, {
  persist: [{
    storage: persistedState.localStorage,
    pick: ["list"]
  }]
});

export { useCartStore as u };
//# sourceMappingURL=cart-D1watn9y.mjs.map
