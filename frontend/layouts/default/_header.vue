<script lang="ts" setup>
  import { MenuIcon } from "lucide-vue-next"

  import type { NavItem } from "~/himalayan_beads"

  import AppSearch from './_search.vue'
  import { useSidebar } from "~/components/ui/sidebar"
  import Cart from './_cart/index.vue'
  import Wishlist from "./_wishlist/index.vue"
  import { useAuthStore } from "~/store/auth"
  import { useCatgoryStore } from "~/store/category"

  const { toggleSidebar } = useSidebar()
  const { can } = useAuthorization()
  const { isLoggedin } = storeToRefs(useAuthStore())
  const { categoryWithProduct } = storeToRefs(useCatgoryStore())

  const randomCategory = computed(() => categoryWithProduct.value?.length > 0
    ? categoryWithProduct.value[Math.floor(Math.random() * categoryWithProduct.value.length)]
    : 0)

  const navItems = ref<NavItem[]>([
    // { name: "Custom Order", to: { name: "custom_order" } },
    { name: "Blogs", to: { name: "blog" } },
  ])

  watchEffect(() => {
    if (randomCategory.value)
      navItems.value.unshift({ name: randomCategory.value?.name, to: { name: "category", query: { slug: randomCategory.value?.slug } } },)
  })
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
          <nav class="hidden lg:flex items-center gap-8 flex-shrink-0" id="nav">
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
          <!-- <div class="hidden md:block">
            <Language />
          </div> -->
          <!-- <div class="relative flex-1 max-w-xs hidden sm:block">
            <AppSearch />
          </div> -->

          <!-- MODIFIED: Favorites Icon with Dropdown -->
          <Wishlist v-if="!isLoggedin || can('', 'User')" />

          <!-- MODIFIED: Cart Icon with Dropdown -->
          <Cart v-if="!isLoggedin || can('', 'User')" />
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
  </header>
</template>