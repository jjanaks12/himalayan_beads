<script lang="ts" setup>
  import { ref } from "vue";
  import { HeartIcon, PlusIcon, CheckIcon } from "lucide-vue-next";
  import { useIntersectionObserver } from "@vueuse/core";
  import { useCartStore } from "@/store/cartStore";
  // Import the types from your central definition file
  import type { Product, Banner } from "~/himalayan_beads";

  // --- Pinia Store ---
  const cartStore = useCartStore();

  // --- Animation Logic (Unchanged) ---
  const sectionRef = ref<HTMLElement | null>(null);
  const isVisible = ref(false);

  useIntersectionObserver(
    sectionRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // --- MODIFIED: The gridItems array is now strongly typed ---
  const gridItems: (Product | Banner)[] = [
    {
      id: 1,
      type: "product",
      name: "One Mukhi Rudraksha",
      subtitle: "(1 Face Rudraksha)",
      price: 200,
      originalPrice: null,
      image: "/images/product01.png",
    },
    {
      id: 2,
      type: "product",
      name: "Combination Of (7,8&12) Mukhi Rudraksha",
      subtitle: "",
      price: 200,
      originalPrice: null,
      image: "/images/product02.png",
    },
    {
      id: 3,
      type: "product",
      name: "One Mukhi Rudraksha",
      subtitle: "(1 Face Rudraksha)",
      price: 200,
      originalPrice: null,
      image: "/images/product03.png",
    },
    {
      id: 4,
      type: "product",
      name: "Rudraksha Mala",
      subtitle: "( 3 Mukhi & 5 Mukhi )",
      price: 200,
      originalPrice: null,
      image: "/images/product01.png",
    },
    {
      id: 5,
      type: "product",
      name: "Combination Of (7,8&12) Mukhi Rudraksha",
      subtitle: "",
      price: 80,
      originalPrice: 100,
      image: "/images/product02.png",
    },
    {
      id: 6,
      type: "product",
      name: "One Mukhi Rudraksha",
      subtitle: "(1 Face Rudraksha)",
      price: 150,
      originalPrice: 200,
      image: "/images/product03.png",
    },
    {
      id: 7,
      type: "banner",
      title: "Promotion Block Banner",
      subtitle: "Best Seller or Sale Offer",
      image: "/images/product04.png",
    },
    {
      id: 8,
      type: "product",
      name: "Rudraksha Mala",
      subtitle: "( 3 Mukhi & 5 Mukhi )",
      price: 200,
      originalPrice: null,
      image: "/images/product01.png",
    },
    {
      id: 9,
      type: "product",
      name: "One Mukhi Rudraksha",
      subtitle: "(1 Face Rudraksha)",
      price: 200,
      originalPrice: null,
      image: "/images/product02.png",
    },
    {
      id: 10,
      type: "product",
      name: "Combination Of (7,8&12) Mukhi Rudraksha",
      subtitle: "",
      price: 200,
      originalPrice: null,
      image: "/images/product03.png",
    },
    {
      id: 11,
      type: "product",
      name: "One Mukhi Rudraksha",
      subtitle: "(1 Face Rudraksha)",
      price: 200,
      originalPrice: null,
      image: "/images/product01.png",
    },
  ];
</script>

<template>
  <section ref="sectionRef" class="featured__products py-4 lg:py-4">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 transition-all duration-800 ease-out" :class="{
        'opacity-100 translate-y-0': isVisible,
        'opacity-0 translate-y-6': !isVisible,
      }">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800">
          Featured This Week: Discover Our Best Rudraksha Collection
        </h2>
      </div>

      <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
        <template v-for="(item, index) in gridItems" :key="item.id">
          <!-- The v-if check below is what makes this type-safe. -->
          <!-- TypeScript knows that inside this block, 'item' must be a 'Product'. -->
          <div v-if="item.type === 'product'"
            class="product__card bg-white transition-all duration-500 ease-out group overflow-hidden border border-[#E5E9EA] relative"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }" :style="{ transitionDelay: `${index * 80}ms` }">
            <div class="product__image relative p-4 aspect-[4/3] flex items-center justify-center">
              <!-- CORRECTED: This now passes a 'Product' object to a function expecting one. -->
              <button @click.stop="cartStore.toggleWishlist(item)"
                class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-transparent rounded-full transition-all duration-300"
                :class="{
                  'text-[#A0522D]': cartStore.isWishlisted(item.id),
                  'text-[#B7B5B4] hover:text-[#A0522D]':
                    !cartStore.isWishlisted(item.id),
                }">
                <HeartIcon class="w-4 h-4 transition-all duration-300 cursor-pointer"
                  :class="{ 'fill-current': cartStore.isWishlisted(item.id) }" />
              </button>
              <img :src="item.image" :alt="item.name"
                class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div class="product__info p-4 text-center">
              <h3
                class="product__name text-sm font-medium text-gray-800 mb-1 leading-tight min-h-[2.5rem] flex items-center justify-center">
                <NuxtLink :to="`/product/${item.id}`">{{ item.name }}</NuxtLink>
              </h3>
              <p v-if="item.subtitle" class="product__subtitle text-xs text-gray-500 mb-3 min-h-[1rem]">
                {{ item.subtitle }}
              </p>
              <div v-else class="mb-3 min-h-[1rem]"></div>

              <div class="product__action relative min-h-[2.5rem] flex items-center justify-center">
                <div
                  class="price__container absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95">
                  <div v-if="item.originalPrice" class="flex items-center justify-center gap-2">
                    <span class="original__price text-sm text-[#100804] line-through">${{ item.originalPrice }}</span>
                    <span class="current__price text-base font-semibold">${{ item.price }}</span>
                  </div>
                  <div v-else-if="item.price">
                    <span class="current__price text-base font-semibold">${{ item.price }}</span>
                  </div>
                </div>
                <div
                  class="add__to__cart__container absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                  <!-- CORRECTED: This now passes a 'Product' object to a function expecting one. -->
                  <button v-if="!cartStore.isCarted(item.id)" @click.stop="cartStore.addToCart(item)"
                    class="add__to__cart__btn cursor-pointer bg-white border border-[#804224] text-[#804224] hover:text-[#FFF] hover:bg-[#804224] px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 transform hover:scale-105">
                    <PlusIcon class="w-3 h-3" />
                    ADD TO CART
                  </button>
                  <NuxtLink v-else to="/cart" @click.stop
                    class="add__to__cart__btn cursor-pointer bg-[#804224] border border-[#804224] text-white px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 transform hover:scale-105">
                    <CheckIcon class="w-3 h-3" />
                    VIEW CART
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <!-- Banner card remains the same and is correctly ignored by the logic above. -->
          <div v-else-if="item.type === 'banner'"
            class="promotion__banner__card col-span-1 sm:col-span-2 lg:col-span-2 transition-all duration-500 ease-out group overflow-hidden cursor-pointer border border-[#E5E9EA] relative"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }" :style="{ transitionDelay: `${index * 80}ms` }">
            <div class="absolute inset-0">
              <img :src="item.image" :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>
            <div class="relative z-10 h-full min-h-[200px] lg:min-h-[240px] flex items-center">
              <div class="p-6 lg:p-8">
                <h3 class="text-xl lg:text-2xl font-bold text-white mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-sm lg:text-base text-gray-200">
                  {{ item.subtitle }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>

  /* No changes to your styles are needed */
  .featured__products {
    position: relative;
  }

  .products__grid {
    width: 100%;
    max-width: none;
  }

  .product__card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 100%;
  }

  .product__image {
    background-color: #f8f9fb;
    background-image: radial-gradient(circle at top center,
        #ffffff 0%,
        #f8f9fb 100%);
  }

  .promotion__banner__card {
    position: relative;
    overflow: hidden;
  }

  .current__price {
    color: #a0522d;
  }

  .product__action {
    position: relative;
  }

  .price__container,
  .add__to__cart__container {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (max-width: 640px) {
    .products__grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .promotion__banner__card {
      grid-column: span 1 / span 1;
      min-height: 180px;
    }
  }

  @media (min-width: 641px) and (max-width: 1023px) {
    .products__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
    }

    .promotion__banner__card {
      grid-column: span 2 / span 2;
      min-height: 200px;
    }
  }

  @media (min-width: 1024px) {
    .products__grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .promotion__banner__card {
      grid-column: span 2 / span 2;
      min-height: 240px;
    }
  }
</style>
