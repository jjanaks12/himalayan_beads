<script lang="ts" setup>
    import { HeartIcon } from "lucide-vue-next"
    import { useCartStore } from "~/store/cartStore"

    import WishlistItem from './item.vue'

    const { wishlistItems } = storeToRefs(useCartStore())

    const favoritesCount = computed(() => wishlistItems.value.length)
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="relative">
                <HeartIcon class="h-5 w-5" />
                <span v-if="favoritesCount > 0"
                    class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium text-[10px]">
                    {{ favoritesCount > 9 ? "9+" : favoritesCount }}
                </span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <span v-if="wishlistItems.length === 0" class="p-8 text-center text-gray-500 text-sm">Your wishlist is
                empty.</span>
            <template v-else>
                <WishlistItem v-for="item in wishlistItems" :key="item.id" :item="item" />
            </template>
        </DropdownMenuContent>
    </DropdownMenu>
</template>