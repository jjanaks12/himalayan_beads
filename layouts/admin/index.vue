<script setup lang="ts">
    import AppSidebar from './sidebar.vue'

    onMounted(() => {
        document.body.classList.add('admin--layout')
        document.body.classList.remove('default--layout', 'simple--layout')
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