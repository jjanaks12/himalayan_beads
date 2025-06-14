<script lang="ts" setup>
    import { MenuIcon } from 'lucide-vue-next'
    import { useSidebar } from '~/components/ui/sidebar'

    const { toggleSidebar } = useSidebar()
</script>

<template>
    <header id="header" class="bg-white py-4">
        <div class="container flex items-center gap-16 mx-auto px-4">
            <Button variant="outline" @click="toggleSidebar">
                <MenuIcon />
            </Button>
            <Brand />
            <ul class="flex gap-8">
                <li>
                    <NuxtLink class="hover:text-[#804224]" :to="{ name: 'rudrarakhshay' }">Rudrarakshya</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="hover:text-[#804224]" :to="{ name: 'custom_order' }">Custom Order</NuxtLink>
                </li>
                <li>
                    <NuxtLink class="hover:text-[#804224]" :to="{ name: 'blog' }">Blog</NuxtLink>
                </li>
            </ul>
        </div>
    </header>
</template>