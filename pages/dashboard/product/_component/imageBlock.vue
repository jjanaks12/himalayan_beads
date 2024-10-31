<script setup lang="ts">
    import type { ProductWithImage } from '~/store/product'

    interface ImageBlockProps {
        id: string,
        images: ProductWithImage[]
    }

    const props = defineProps<ImageBlockProps>()
    const { files, handleFileInput } = useFileStorage()

    const isLoading = ref(false)

    const saveImages = () => {
        isLoading.value = true

        $fetch(`/api/product/${props.id}/images`, {
            method: 'POST',
            body: {
                files: files.value,
                product_id: props.id
            }
        })
            .then(() => {
                files.value = []
            })
            .finally(() => {
                isLoading.value = false
            })
    }
</script>

<template>
    <div class="image__section">
        <label class="custom__file">
            <input type="file" @change="handleFileInput" name="file" multiple accept="image/*" />
            <div class="custom__file__text">
                <ol class="custom__file__list">
                    <template v-if="files.length > 0">
                        <li class="custom__file__list__item" v-for="(file, index) in files">
                            <img :src="file.content" :alt="file.name">
                            <a href="#" @click.prevent="files.splice(index, 1)"><span class="icon-add"></span></a>
                        </li>
                        <li class="custom__file__list__item">
                            <span>You have selected {{ files.length }} image{{ files.length > 1 ? 's' : '' }}</span>
                            <button class="btn btn__primary" @click="saveImages">save images</button>
                        </li>
                    </template>
                    <li class="custom__file__list__item" v-else>
                        <strong>Select your files</strong>
                    </li>
                </ol>
            </div>
        </label>
        <div class="image__list">
            <figure :class="{ 'image': true, 'image--featured': image.featured }" v-for="image in images">
                <MdiIcon icon="mdiStar" class="featured--icon text--warning" v-if="image.featured" />
                <img :src="(image.images?.url as string)" alt="image description">
                <div class="image__action">
                    <a href="#">
                        <MdiIcon icon="mdiCloseCircle" />
                    </a>
                    <a href="#">
                        <MdiIcon icon="mdiEye" />
                    </a>
                </div>
            </figure>
        </div>
    </div>
</template>