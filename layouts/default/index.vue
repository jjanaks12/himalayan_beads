<script setup lang="ts">
    import AppHeader from './header.vue'
    import AppFooter from './footer.vue'

    onMounted(() => {
        document.body.classList.add('default--layout')
        document.body.classList.remove('simple--layout', 'admin--layout')
    })
</script>

<template>
    <div id="wrapper" class="default--layout">
        <AppHeader />
        <slot />
        <AppFooter />
    </div>
</template>