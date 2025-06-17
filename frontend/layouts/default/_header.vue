<script lang="ts" setup>
  import { ref, nextTick } from "vue"
  import { MenuIcon, SearchIcon, HeartIcon, ShoppingBasketIcon } from "lucide-vue-next"

  import { useSidebar } from "~/components/ui/sidebar"
  import type { NavItem } from "~/himalayan_beads"

  // Sidebar functionality
  const { toggleSidebar } = useSidebar()

  // Search functionality
  const searchQuery = ref("")
  const searchInput = ref<HTMLInputElement>()

  const handleSearch = () => {
    if (searchQuery.value.trim()) {
      // Navigate to search results
      navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`)
      searchQuery.value = ""
    }
  }

  const focusSearch = () => {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }

  // Language functionality

  // Cart and favorites functionality
  const cartItemsCount = ref(3)
  const favoritesCount = ref(5)

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Rudrakshaya", to: { name: "category", query: { slug: 'Rudrakshaya' } } },
    { name: "Custom Order", to: { name: "custom_order" } },
    { name: "Blog", to: { name: "blog" } },
  ]
</script>

<template>
  <header id="header" class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 gap-4">
        <!-- Left Section: Menu + Logo -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" @click="toggleSidebar"
            class="hover:bg-gray-100 transition-colors duration-200">
            <MenuIcon class="h-5 w-5" />
          </Button>

          <Brand class="mr-12" />
          <nav class="hidden lg:flex items-center gap-8 flex-shrink-0">
            <ul class="flex gap-8">
              <li v-for="item in navItems" :key="item.name">
                <NuxtLink :to="item.to"
                  class="text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200 relative group whitespace-nowrap">
                  {{ item.name }}
                  <span
                    class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#804224] transition-all duration-200 group-hover:w-full" />
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Center Section: Navigation (Hidden on mobile) -->

        <!-- Right Section: Search, Language, Favorites, Cart -->
        <div class="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <!-- Language Switcher -->
          <Language />

          <!-- Search Bar - Always Visible -->
          <div class="relative flex-1 max-w-xs hidden sm:block">
            <form @submit.prevent="handleSearch" class="relative">
              <Input ref="searchInput" v-model="searchQuery" placeholder="Search..."
                class="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 transition-all duration-200 rounded-2xl" />
              <SearchIcon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Button type="submit" variant="ghost" size="sm"
                class="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100">
              </Button>
            </form>
          </div>

          <!-- Mobile Search Button -->
          <Button variant="ghost" size="icon" @click="focusSearch"
            class="sm:hidden hover:bg-gray-100 transition-colors duration-200">
            <SearchIcon class="h-5 w-5" />
          </Button>

          <!-- Favorites -->
          <NuxtLink to="/favorites" class="relative group">
            <Button variant="ghost" size="icon" class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9">
              <HeartIcon class="h-5 w-5 group-hover:text-red-500 transition-colors duration-200" />
            </Button>
            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-0">
              <span v-if="favoritesCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                {{ favoritesCount > 9 ? "9+" : favoritesCount }}
              </span>
            </Transition>
          </NuxtLink>

          <!-- Cart -->
          <NuxtLink to="/cart" class="relative group">
            <Button variant="ghost" size="icon" class="hover:bg-gray-100 transition-colors duration-200 h-9 w-9">
              <ShoppingBasketIcon class="h-5 w-5 group-hover:text-green-600 transition-colors duration-200" />
            </Button>
            <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-0">
              <span v-if="cartItemsCount > 0"
                class="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                {{ cartItemsCount > 9 ? "9+" : cartItemsCount }}
              </span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation & Search -->
    <div class="lg:hidden border-t border-gray-100">
      <!-- Mobile Search Bar -->
      <div class="px-4 py-3 sm:hidden">
        <form @submit.prevent="handleSearch" class="relative">
          <Input v-model="searchQuery" placeholder="Search products..."
            class="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 transition-all duration-200" />
          <SearchIcon
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Button type="submit" variant="ghost" size="sm"
            class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100">
            <SearchIcon class="h-4 w-4" />
          </Button>
        </form>
      </div>

      <!-- Mobile Navigation -->
      <div class="px-4 py-3">
        <nav class="flex justify-center gap-6">
          <NuxtLink v-for="item in navItems" :key="item.name" :to="item.to"
            class="text-sm text-gray-700 hover:text-[#804224] font-medium transition-colors duration-200">
            {{ item.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>

  /* Custom animations for smooth transitions */
  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Custom input focus styles */
  .focus\:bg-white:focus {
    background-color: white;
  }

  .focus\:border-gray-300:focus {
    border-color: #d1d5db;
  }
</style>
