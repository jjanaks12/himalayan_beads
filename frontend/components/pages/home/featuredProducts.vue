<script lang="ts" setup>
  import { ref } from "vue";
  import { useIntersectionObserver } from "@vueuse/core"

  import { useProductStore } from "~/store/product"
  import ProductItem from "./productItem.vue"

  // --- Animation Logic (Unchanged) ---
  const sectionRef = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  useIntersectionObserver(
    sectionRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  const { products } = storeToRefs(useProductStore())
  const { fetch } = useProductStore()

  onBeforeMount(() => {
    fetch()
  })
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
        <ProductItem v-for="(item, index) in products" :key="item.id" :product="item" :index="index"
          :show="isVisible" />
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
