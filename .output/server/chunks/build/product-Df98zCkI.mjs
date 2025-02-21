import { computed } from 'vue';

const useProduct = (product) => {
  const featuredImage = computed(() => {
    var _a;
    let image = "/images/logo.svg";
    if ((product == null ? void 0 : product.images.length) > 0) {
      const featuredImage2 = product == null ? void 0 : product.images.find((image2) => image2.featured);
      if (featuredImage2)
        image = (_a = featuredImage2 == null ? void 0 : featuredImage2.images) == null ? void 0 : _a.url;
    }
    return image;
  });
  const currentPrice = computed(() => {
    let price;
    if ((product == null ? void 0 : product.prices.length) > 0) {
      const pricedProduct = product == null ? void 0 : product.prices[(product == null ? void 0 : product.prices.length) - 1];
      price = pricedProduct.price.amount;
    }
    return price;
  });
  return { featuredImage, currentPrice };
};

export { useProduct as u };
//# sourceMappingURL=product-Df98zCkI.mjs.map
