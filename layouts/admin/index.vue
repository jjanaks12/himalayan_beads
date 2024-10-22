<script setup lang="ts">
    import AppSidebar from './sidebar.vue'

    onMounted(() => {
        document.body.classList.add('admin--layout')
    })
</script>

<template>
    <div id="admin" class="admin--layout">
        <AppSidebar />
        <main id="main">
            <slot />
        </main>
    </div>
</template>

<style lang="scss">
    @import url('@/assets/scss/admin.scss');
</style>