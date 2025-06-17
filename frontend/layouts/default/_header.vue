<script lang="ts" setup>
import { ref, computed, nextTick } from "vue"; // <-- 1. Import 'computed'
import { navigateTo } from "#app";
import {
  MenuIcon,
  SearchIcon,
  HeartIcon,
  ShoppingBasketIcon,
  ChevronDownIcon,
} from "lucide-vue-next";
import { useSidebar } from "~/components/ui/sidebar";
import { useCartStore } from '@/store/cartStore'; // <-- 2. Import the cart store

// --- Pinia Store ---
const cartStore = useCartStore(); // <-- 3. Initialize the store

// Sidebar functionality
const { toggleSidebar } = useSidebar();

// Search functionality
const searchQuery = ref("");
const searchInput = ref<HTMLInputElement>();

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    searchQuery.value = "";
  }
};

const focusSearch = () => {
  nextTick(() => {
    searchInput.value?.focus();
  });
};

// Language functionality
const isLanguageOpen = ref(false);
const currentLanguage = ref({
  code: "en",
  name: "English",
  flag: "🇺🇸",
});

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ne", name: "नेपाली", flag: "🇳🇵" }, 
];

const switchLanguage = (language: (typeof languages)[0]) => {
  currentLanguage.value = language;
  isLanguageOpen.value = false;
};

// Cart and favorites functionality
const cartItemsCount = ref(3); // This remains static for now

// --- MODIFICATION: Make favorites count dynamic ---
// This computed property will always reflect the number of items in the store's wishlist.
// It is reactive, so it will update automatically whenever the wishlist changes.
const favoritesCount = computed(() => cartStore.wishlistItems.length);
const addTocartCount = computed(() => cartStore.cartItems.length);


// Navigation items
const navItems = [
  { name: "Rudraksha", to: { name: "rudrarakhshay" } },
  { name: "Custom Order", to: { name: "custom_order" } },
  { name: "Blog", to: { name: "blog" } },
];

// Close dropdowns when clicking outside
const closeDropdowns = () => {
  isLanguageOpen.value = false;
};
</script>

<template>
  <header
    id="header"
    class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Left Section: Menu + Logo -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            @click="toggleSidebar"
            class="hover:bg-gray-100 transition-colors duration-200"
          >
            <MenuIcon class="h-5 w-5" />
          </Button>

          <Brand class="mr-12" />
          <nav class="hidden lg:flex items-center gap-8 flex-shrink-0">
            <ul class="flex gap-8">
              <li v-for="item in navItems" :key="item.name">
                <NuxtLink
                  :to="item.to"
                  class="text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200 relative group whitespace-nowrap"
                >
                  {{ item.name }}
                  <span
                    class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#804224] transition-all duration-200 group-hover:w-full"
                  ></span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Right Section: Search, Language, Favorites, Cart -->
        <div class="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <!-- Language Switcher -->
          <div class="relative">
            <Button
              variant="ghost"
              @click="isLanguageOpen = !isLanguageOpen"
              class="flex items-center gap-1 lg:gap-2 hover:bg-gray-100 transition-colors duration-200 px-2 lg:px-3"
            >
              <img
                :src="`https://flagcdn.com/w20/${
                  currentLanguage.code === 'en'
                    ? 'us'
                    : currentLanguage.code === 'ne'
                    ? 'np'
                    : 'in'
                }.png`"
                :alt="currentLanguage.name"
                class="w-4 h-3 object-cover"
                loading="lazy"
              />
              <span class="hidden lg:inline text-sm font-medium">{{
                currentLanguage.name
              }}</span>
              <ChevronDownIcon
                class="h-3 w-3 lg:h-4 lg:w-4 transition-transform duration-200"
                :class="{ 'rotate-180': isLanguageOpen }"
              />
            </Button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="isLanguageOpen"
                class="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <button
                  v-for="language in languages"
                  :key="language.code"
                  @click="switchLanguage(language)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
                  :class="{
                    'bg-gray-50': currentLanguage.code === language.code,
                  }"
                >
                  <img
                    :src="`https://flagcdn.com/w20/${
                      language.code === 'en'
                        ? 'us'
                        : language.code === 'ne'
                        ? 'np'
                        : 'in'
                    }.png`"
                    :alt="language.name"
                    class="w-5 h-4 object-cover"
                    loading="lazy"
                  />
                  <span class="text-sm">{{ language.name }}</span>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Search Bar - Always Visible -->
          <div class="relative flex-1 max-w-xs hidden sm:block">
            <!-- (Search form remains unchanged) -->
            <form @submit.prevent="handleSearch" class="relative">
              <Input
                ref="searchInput"
                v-model="searchQuery"
                placeholder="Search..."
                class="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 transition-all duration-200 rounded-2xl"
              />
              <SearchIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
              />
            </form>
          </div>

          <!-- Mobile Search Button -->
          <Button
            variant="ghost"
            size="icon"
            @click="focusSearch"
            class="sm:hidden hover:bg-gray-100 transition-colors duration-200"
          >
            <SearchIcon class="h-5 w-5" />
          </Button>

          <!-- Favorites -->
          <NuxtLink to="/favorites" class="relative group">
            <Button
              variant="ghost"
              size="icon"
              class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9"
            >
              <HeartIcon
                class="h-5 w-5 group-hover:text-red-500 transition-colors duration-200"
              />
            </Button>
            <!-- 
              --- MODIFICATION: The v-if now checks our dynamic favoritesCount. 
              The badge will only render if the count is greater than 0. 
            -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-0"
            >
              <span
                v-if="favoritesCount > 0" 
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]"
              >
                {{ favoritesCount > 9 ? "9+" : favoritesCount }}
              </span>
            </Transition>
          </NuxtLink>

          <!-- Cart (remains unchanged for now) -->
          <NuxtLink to="/cart" class="relative group">
            <Button
              variant="ghost"
              size="icon"
              class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9"
            >
              <ShoppingBasketIcon
                class="h-5 w-5 group-hover:text-green-600 transition-colors duration-200"
              />
            </Button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-0"
            >
              <span
                v-if="addTocartCount > 0"
                class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]"
              >
                {{ addTocartCount > 9 ? "9+" : addTocartCount }}
              </span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation & Search (remains unchanged) -->
    <div class="lg:hidden border-t border-gray-100">
      <div class="px-4 py-3 sm:hidden">
        <form @submit.prevent="handleSearch" class="relative">
          <Input
            v-model="searchQuery"
            placeholder="Search products..."
            class="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 transition-all duration-200"
          />
          <SearchIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
          />
        </form>
      </div>
      <div class="px-4 py-3">
        <nav class="flex justify-center gap-6">
          <NuxtLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.to"
            class="text-sm text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>

    <!-- Overlay (remains unchanged) -->
    <div
      v-if="isLanguageOpen"
      @click="closeDropdowns"
      class="fixed inset-0 z-40"
    ></div>
  </header>
</template>

<style scoped>
/* No changes needed to styles */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
.focus\:bg-white:focus { background-color: white; }
.focus\:border-gray-300:focus { border-color: #d1d5db; }
</style>