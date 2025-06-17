<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { HeartIcon, PlusIcon } from "lucide-vue-next";

// Animation states
const isVisible = ref(false);
const sectionRef = ref<HTMLElement>();

// Exact product data matching the image layout
const gridItems = [
  // Row 1 - 4 products
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
  // Row 2 - 2 products + 1 banner (spans 2 columns)
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
  // Row 3 - 4 products
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

const wishlistItems = ref<number[]>([]);

const toggleWishlist = (productId: number) => {
  const index = wishlistItems.value.indexOf(productId);
  if (index > -1) {
    wishlistItems.value.splice(index, 1);
  } else {
    wishlistItems.value.push(productId);
  }
};

const isWishlisted = (productId: number) => {
  return wishlistItems.value.includes(productId);
};

const addToCart = (productId: number) => {
  // Add to cart functionality
  console.log("Added to cart:", productId);
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<template>
  <section ref="sectionRef" class="featured__products py-4 lg:py-6">
    <div class="container mx-auto px-4">
      <!-- Section Title -->-
      <div
        class="text-center mb-12 transition-all duration-800 ease-out"
        :class="{
          'opacity-100 translate-y-0': isVisible,
          'opacity-0 translate-y-6': !isVisible,
        }"
      >
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800">
          Featured This Week: Discover Our Best Rudraksha Collection
        </h2>
      </div>

      <!-- Products Grid - Container Width with Responsive Layout -->
      <div
        class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full"
      >
        <template v-for="(item, index) in gridItems" :key="item.id">
          <!-- Product Card -->
          <div
            v-if="item.type === 'product'"
            class="product__card bg-white transition-all duration-500 ease-out group overflow-hidden border border-[#E5E9EA] relative"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }"
            :style="{
              transitionDelay: `${index * 80}ms`,
            }"
          >
            <!-- Product Image Container -->
            <div
              class="product__image relative p-4 aspect-[4/3] flex items-center justify-center"
            >
              <!-- Wishlist Button -->
              <button
                @click="toggleWishlist(item.id)"
                class="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center bg-transparent rounded-full transition-all duration-300"
                :class="{
                  'text-[#A0522D]': isWishlisted(item.id),
                  'text-[#B7B5B4] hover:text-[#A0522D]': !isWishlisted(item.id),
                }"
              >
                <HeartIcon
                  class="w-4 h-4 transition-all duration-300"
                  :class="{ 'fill-current': isWishlisted(item.id) }"
                />
              </button>

              <!-- Product Image -->
              <img
                :src="item.image"
                :alt="item.name"
                class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <!-- Product Info -->
            <div class="product__info p-4 text-center">
              <!-- Product Name -->
              <h3
                class="product__name text-sm font-medium text-gray-800 mb-1 leading-tight min-h-[2.5rem] flex items-center justify-center"
              >
                {{ item.name }}
              </h3>

              <!-- Product Subtitle -->
              <p
                v-if="item.subtitle"
                class="product__subtitle text-xs text-gray-500 mb-3 min-h-[1rem]"
              >
                {{ item.subtitle }}
              </p>
              <div v-else class="mb-3 min-h-[1rem]"></div>

              <!-- Price and Add to Cart (Overlapping with Transitions) -->
              <div
                class="product__action relative min-h-[2.5rem] flex items-center justify-center"
              >
                <!-- Price Display (fades out on hover) -->
                <div
                  class="price__container absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:scale-95"
                >
                  <div
                    v-if="item.originalPrice"
                    class="flex items-center justify-center gap-2"
                  >
                    <span
                      class="original__price text-sm text-[#100804] line-through"
                    >
                      ${{ item.originalPrice }}
                    </span>
                    <span class="current__price text-base font-semibold">
                      ${{ item.price }}
                    </span>
                  </div>
                  <div v-else-if="item.price">
                    <span class="current__price text-base font-semibold">
                      ${{ item.price }}
                    </span>
                  </div>
                </div>

                <!-- Add to Cart Button (appears on hover) -->
                <div
                  class="add__to__cart__container absolute inset-0 flex items-center justify-center opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                >
                  <button
                    @click="addToCart(item.id)"
                    class="add__to__cart__btn cursor-pointer bg-white font-bold border border-[#804224] text-[#804224] hover:text-[#FFF] hover:bg-[#804224] px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1 transform hover:scale-105"
                  >
                    <PlusIcon class="w-3 h-3" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Promotion Banner Card (spans 2 columns) -->
          <div
            v-else-if="item.type === 'banner'"
            class="promotion__banner__card col-span-1 sm:col-span-2 lg:col-span-2 transition-all duration-500 ease-out group overflow-hidden cursor-pointer border border-[#E5E9EA] relative"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }"
            :style="{
              transitionDelay: `${index * 80}ms`,
            }"
          >
            <!-- Background Image (covers entire span-2 area) -->
            <div class="absolute inset-0">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Overlay for text readability -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-black/150 via-black/230 to-transparent"
              ></div>
            </div>

            <!-- Content Overlay -->
            <div
              class="relative z-10 h-full min-h-[200px] lg:min-h-[240px] flex items-center"
            >
              <div class="p-6 lg:p-8">
                <h3 class="text-xl lg:text-2xl font-bold text-[#100804] mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-sm lg:text-base text-[#100804]">
                  {{ item.subtitle }}
                </p>
              </div>
            </div>

            <!-- Hover Effect Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#804224]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

  /* The actual radial gradient */
  background-image: radial-gradient(
    circle at top center,
    #ffffff 0%,
    #f8f9fb 100%
  );
}

.promotion__banner__card {
  /* background: linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%); */
  position: relative;
  overflow: hidden;
}

.current__price {
  color: #a0522d;
}

/* Ensure smooth transitions for overlapping elements */
.product__action {
  position: relative;
}

.price__container,
.add__to__cart__container {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile Responsive Design */
@media (max-width: 640px) {
  .products__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .promotion__banner__card {
    col-span: 1;
    min-height: 180px;
  }
}

/* Tablet Responsive Design */
@media (min-width: 641px) and (max-width: 1023px) {
  .products__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  .promotion__banner__card {
    col-span: 2;
    min-height: 200px;
  }
}

/* Desktop Design */
@media (min-width: 1024px) {
  .products__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .promotion__banner__card {
    col-span: 2;
    min-height: 240px;
  }
}
</style>
