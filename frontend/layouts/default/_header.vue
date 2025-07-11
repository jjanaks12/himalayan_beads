<script lang="ts" setup>
  import { ref, computed } from "vue"
  import { MenuIcon, HeartIcon, XIcon } from "lucide-vue-next"

  import { useCartStore } from "@/store/cartStore"
  import type { NavItem } from "~/himalayan_beads"

  import AppSearch from './_search.vue'
  import { useSidebar } from "~/components/ui/sidebar"
  import Cart from './_cart/index.vue'

  // --- Pinia Store ---
  const cartStore = useCartStore()

  // --- NEW: Dropdown State Management ---
  const isWishlistOpen = ref(false)
  const isCartOpen = ref(false)

  const toggleWishlistDropdown = () => {
    isCartOpen.value = false // Close other dropdown first
    isWishlistOpen.value = !isWishlistOpen.value
  }

  const closeDropdowns = () => {
    isWishlistOpen.value = false
    isCartOpen.value = false
  }

  // --- Dynamic Counts from Store ---
  const favoritesCount = computed(() => cartStore.wishlistItems.length)
  // Using totalCartItems for an accurate quantity count on the badge
  const cartItemsCount = computed(() => cartStore.totalCartItems)

  // --- Existing Logic (Largely Unchanged) ---
  const { toggleSidebar } = useSidebar()
  const navItems: NavItem[] = [
    { name: "Rudrakshaya", to: { name: "category", query: { slug: "Rudrakshaya" } } },
    { name: "Custom Order", to: { name: "custom_order" } },
    { name: "Blog", to: { name: "blog" } },
  ]
</script>

<template>
  <header id="header" class="bg-white border-b border-gray-100 sticky top-0 shadow-sm z-40">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Left Section (Unchanged) -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" @click="toggleSidebar"
            class="hover:bg-gray-100 transition-colors duration-200">
            <MenuIcon class="h-5 w-5" />
          </Button>
          <Brand class="mr-2 sm:mr-4 md:mr-8 lg:mr-12" />
          <nav class="hidden lg:flex items-center gap-8 flex-shrink-0">
            <ul class="flex gap-8">
              <li v-for="item in navItems" :key="item.name">
                <NuxtLink :to="item.to"
                  class="text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200 relative group whitespace-nowrap">
                  {{ item.name }}
                  <span
                    class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#804224] transition-all duration-200 group-hover:w-full"></span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Right Section: Interactive Icons -->
        <div class="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <div class="hidden md:block">
            <Language />
          </div>
          <div class="relative flex-1 max-w-xs hidden sm:block">
            <AppSearch />
          </div>

          <!-- MODIFIED: Favorites Icon with Dropdown -->
          <div class="relative">
            <Button @click.stop="toggleWishlistDropdown" variant="ghost" size="icon"
              class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9">
              <HeartIcon class="h-5 w-5" />
            </Button>
            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-0">
              <span v-if="favoritesCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                {{ favoritesCount > 9 ? "9+" : favoritesCount }}
              </span>
            </Transition>

            <!-- Wishlist Dropdown Panel -->
            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
              <div v-if="isWishlistOpen"
                class="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
                <div class="p-4 border-b flex justify-between items-center">
                  <h3 class="font-semibold text-gray-800">My Wishlist</h3>
                  <button @click="closeDropdowns" class="text-gray-400 hover:text-gray-700">
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>
                <div class="overflow-y-auto max-h-80">
                  <div v-if="cartStore.wishlistItems.length === 0" class="p-8 text-center text-gray-500 text-sm">Your
                    wishlist is empty.</div>
                  <ul v-else>
                    <li v-for="item in cartStore.wishlistItems" :key="item.id"
                      class="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                      <img :src="item.image" :alt="item.name" class="w-14 h-14 object-contain rounded bg-gray-100">
                      <div class="flex-grow min-w-0">
                        <p class="text-sm font-medium text-gray-800 line-clamp-2">{{ item.name }}</p>
                        <p class="text-sm text-[#A0522D] font-semibold">${{ item.price }}</p>
                      </div>
                      <button @click.stop="cartStore.removeFromWishlist(item.id)" title="Remove from wishlist"
                        class="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors">
                        <XIcon class="w-4 h-4" />
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="p-3 border-t bg-gray-50" v-if="cartStore.wishlistItems.length > 0">
                  <NuxtLink to="/wishlist" @click="closeDropdowns"
                    class="block w-full text-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded text-sm transition-colors">
                    View Full Wishlist</NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- MODIFIED: Cart Icon with Dropdown -->
          <Cart />
        </div>
      </div>
    </div>
    <!-- Mobile Navigation & Search (remains unchanged) -->
    <div class="lg:hidden border-t border-gray-100">
      <div class="px-4 py-3 sm:hidden">
        <AppSearch />
      </div>
      <div class="px-4 py-3">
        <nav class="flex justify-center gap-6">
          <NuxtLink v-for="item in navItems" :key="item.name" :to="item.to"
            class="text-sm text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200">
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Overlay (remains unchanged) -->
    <div v-if="isWishlistOpen || isCartOpen" @click="closeDropdowns" class="fixed inset-0 z-40"></div>
  </header>
</template>

<style scoped>

  /* No changes needed to styles */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .focus\:bg-white:focus {
    background-color: white;
  }

  .focus\:border-gray-300:focus {
    border-color: #d1d5db;
  }
</style>
