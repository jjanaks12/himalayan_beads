<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import type { Image } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useBlogStore } from '~/store/blogStore'

    interface BlogFeaturedImageProps {
        blogId: string
        image?: Image
    }

    const fileToUpload = ref<string>()
    const popupImage = ref<string | null>(null)
    const isSavingImages = ref(false)
    const canSaveImage = ref(false)
    const canChangeImage = ref(false)

    const props = defineProps<BlogFeaturedImageProps>()
    const emit = defineEmits(['update'])
    const { saveImage } = useBlogStore()
    const { can } = useAuthorization()

    const save = async () => {
        if (fileToUpload.value) {
            isSavingImages.value = true
            await saveImage(props.blogId, fileToUpload.value)
            emit('update')
            fileToUpload.value = undefined
            isSavingImages.value = false
        }
    }

    const fileInputHandler = (event: Event) => {
        const fileList = (event.target as HTMLInputElement).files
        if (fileList && fileList[0]) {
            const reader = new FileReader()

            reader.readAsDataURL(fileList[0])
            reader.onload = () => {
                fileToUpload.value = reader.result as string
            }
        }
        canSaveImage.value = true
    }

    onMounted(() => {
        if (props.image) {
            fileToUpload.value = showImage(props.image?.name)
            canChangeImage.value = true
        }
    })
</script>

<template>
    <label class="flex justify-center items-center border border-dashed p-1 min-h-[180px] rounded-sm overflow-hidden"
        v-if="can('update_blog') && !canChangeImage">
        <div class="text-center text-sm" v-if="!fileToUpload">
            <strong class="block">Upload image</strong>
            <em class="not-italic">(Click here to select and upload featured image for blog)</em>
        </div>
        <div class="w-full h-full relative" v-else>
            <img :src="fileToUpload" class="w-full h-full object-cover" @click="popupImage = fileToUpload" />
            <Button @click="save" class="absolute z-10 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2"
                v-if="canSaveImage">
                <LoaderIcon class="animate animate-spin" v-if="isSavingImages" />
                Save images
            </Button>
        </div>
        <input type="file" @change="fileInputHandler" class="sr-only" accept="image/*">
    </label>
    <figure class="flex justify-center items-center border min-h-[180px] rounded-sm overflow-hidden" v-else>
        <img :src="fileToUpload" class="w-full h-full object-cover" />
    </figure>
    <div class="text-right">
        <Button variant="link" size="sm" @click="canChangeImage = !canChangeImage"
            permissions="update_blog">change</Button>
    </div>
</template>