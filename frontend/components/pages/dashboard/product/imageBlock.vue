<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, LoaderIcon, StarIcon, TrashIcon } from 'lucide-vue-next'

    import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
    import type { ImageOnProduct } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useProductStore } from '~/store/product'

    interface ImageBlockProps {
        productId: string
        images?: ImageOnProduct[]
    }

    const files = ref<string[]>([])
    const isSavingImages = ref(false)
    const popupImage = ref<string | null>(null)

    const { saveImages, setFeaturedImage, deleteImage } = useProductStore()
    const props = defineProps<ImageBlockProps>()
    const emit = defineEmits(['update'])

    const fileInputHandler = (event: Event) => {
        const fileList = (event.target as HTMLInputElement).files
        if (!fileList)
            return

        for (const file of fileList) {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                files.value.push(reader.result as string)
            }
        }
    }

    const deleteUploadedImage = (index: number) => {
        files.value.splice(index, 1)
    }

    const save = async () => {
        isSavingImages.value = true
        await saveImages(props.productId, files.value)
        emit('update')
        files.value = []
        isSavingImages.value = false
    }

    const isDialogOpen = computed(() => popupImage.value !== null)
</script>

<template>
    <div class="mb-8 border-b border-dashed pb-8">
        <div class="flex">
            <h2 class="text-lg">Images</h2>
        </div>
        <div class="flex flex-wrap gap-4">
            <label class="flex justify-center items-center border w-[calc(25%-16px)] min-h-[180px] rounded-sm">
                <div class="text-center text-sm">
                    <template v-if="files.length == 0">
                        <strong class="block">Upload files</strong>
                        <em class="not-italic">(You can choose multiple images)</em>
                    </template>
                    <template v-else>
                        <Button @click="save">
                            <LoaderIcon class="animate animate-spin" v-if="isSavingImages" />
                            Save images
                        </Button>
                    </template>
                </div>
                <input type="file" @change="fileInputHandler" multiple class="sr-only" accept="image/*">
            </label>
            <div v-for="(file, index) in files"
                class="relative w-[calc(25%-16px)] min-h-[180px] border rounded-sm overflow-hidden">
                <img :src="file" class="w-full h-full object-cover" @click="popupImage = file" />
                <DropdownMenu>
                    <DropdownMenuTrigger class="absolute top-2 right-2">
                        <EllipsisVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem @click="popupImage = file">
                            <EyeIcon />
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="deleteUploadedImage(index)">
                            <TrashIcon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div v-for="productImage in images" :class="{
                'relative w-[calc(25%-16px)] min-h-[180px] border rounded-sm overflow-hidden': true,
                'border-primary': productImage.featured
            }">
                <img :src="showImage(productImage.image?.name as string)" class="w-full h-full object-cover"
                    @click="popupImage = showImage(productImage.image.name)" />
                <StarIcon :size="16" class="text-primary absolute top-3 right-8" v-if="productImage.featured" />
                <DropdownMenu>
                    <DropdownMenuTrigger class="absolute top-2 right-2">
                        <EllipsisVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem @click="popupImage = showImage(productImage.image.name)">
                            <EyeIcon />
                            View
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="async () => {
                            await deleteImage(productImage.image.id)
                            emit('update')
                        }">
                            <TrashIcon />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="async () => {
                            await setFeaturedImage(productImage.id, productId)
                            emit('update')
                        }">
                            <StarIcon />
                            Set as featured
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </div>
    <Dialog :open="isDialogOpen" @update:open="popupImage = null">
        <DialogContent class="bg-white p-0 overflow-hidden">
            <DialogHeader class="sr-only">
                <DialogTitle>Image</DialogTitle>
                <DialogDescription>
                    Product image preview
                </DialogDescription>
            </DialogHeader>
            <img :src="(popupImage as string)" />
        </DialogContent>
    </Dialog>
</template>