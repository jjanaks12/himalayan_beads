<script lang="ts" setup>
    import AppSidebar from './(partials)/_sidebar.vue'
</script>

<template>
    <SidebarProvider class="bg-white">
        <AppSidebar />
        <main id="main">
            <slot />
        </main>
    </SidebarProvider>
</template>