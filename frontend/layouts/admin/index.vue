<script lang="ts" setup>
    import AppSidebar from './(partials)/_sidebar.vue'
    import AppHeader from './(partials)/_header.vue'
</script>

<template>
    <SidebarProvider class="bg-gray-200">
        <AppSidebar />
        <main id="main" class="grow">
            <AppHeader />
            <div class="bg-white m-4 p-4 rounded-xl">
                <slot />
            </div>
        </main>
    </SidebarProvider>
</template>