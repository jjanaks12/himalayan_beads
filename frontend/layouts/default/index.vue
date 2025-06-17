<script lang="ts" setup>
    import AppHeader from './_header.vue'
    import AppSidebar from './_sidebar.vue'
    import AppFooter from './_footer.vue'
</script>

<template>
    <SidebarProvider :default-open="false">
        <AppSidebar />
        <div id="wrapper" class="bg-white w-full text-[#403936] relative">
            <AppHeader />
            <main id="main">
                <slot />
            </main>
            <AppFooter />
        </div>
    </SidebarProvider>
</template>