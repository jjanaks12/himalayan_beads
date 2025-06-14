<script lang="ts" setup>
    import AppHeader from './_header.vue'
    import AppSidebar from './_sidebar.vue'
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <div id="wrapper" class="bg-white w-full text-[#403936] relative">
            <AppHeader />
            <main id="main">
                <slot />
            </main>
        </div>
    </SidebarProvider>
</template>