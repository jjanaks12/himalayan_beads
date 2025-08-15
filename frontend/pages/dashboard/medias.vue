<script lang="ts" setup>
    import type { Image } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
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
    const viewMedia = ref<null | Image>(null)

    const showDialog = computed(() => viewMedia.value != null)
</script>

<template>
    <Button @click="fetch">fetch</Button>
    <div class="flex flex-wrap divider rounded-xl overflow-hidden">
        <div class="w-1/4" v-for="media in images" @click="viewMedia = media">
            <img :src="showImage(media.name)" alt="image description" class="w-full aspect-square object-cover">
        </div>
    </div>
    <Dialog :open="showDialog" v-if="viewMedia" @update:open="viewMedia = null">
        <DialogContent class="bg-white">
            <DialogTitle class="hidden">Image</DialogTitle>
            <DialogDescription class="hidden">Descriotion</DialogDescription>
            <img :src="showImage(viewMedia.name)" alt="image description" class="w-full h-auto">
        </DialogContent>
    </Dialog>
</template>