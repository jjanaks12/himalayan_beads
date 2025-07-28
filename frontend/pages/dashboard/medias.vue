<script lang="ts" setup>
    import { useMediaStore } from '~/store/mediaStore'

    useHead({
        title: 'Media'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: 'manage_media'
    })

    const { images } = storeToRefs(useMediaStore())
    const { fetch } = useMediaStore()
</script>

<template>
    <Button @click="fetch">fetch</Button>
    <pre>{{ images }}</pre>
</template>