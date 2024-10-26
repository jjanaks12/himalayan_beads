<script setup lang="ts">
    import AppSidebar from './sidebar.vue'

    onMounted(() => {
        document.body.classList.add('admin--layout')
    })
</script>

<template>
    <div id="admin" class="admin--layout">
        <AppSidebar />
        <main id="admin-main">
            <slot />
        </main>
    </div>
</template>