<script setup lang="ts">
    import type { ProductWithImage } from '~/store/product'
    import Dropdown from '~/components/Dropdown.vue'

    interface ImageBlockProps {
        id: string,
        images: ProductWithImage[]
    }

    const props = defineProps<ImageBlockProps>()
    const emit = defineEmits(['update'])
    const { files, handleFileInput } = useFileStorage()

    const isLoading = ref(false)
    const showViewModal = ref(false)
    const viewImage = ref<string | null>(null)

    const deleteImageID = ref<string | null>(null)
    const showDeleteConfirm = ref(false)

    const loading = ref<{ [propsName: string]: boolean }>({})

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
                emit('update')
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const deleteImage = async () => {
        if (deleteImageID.value) {
            loading.value[deleteImageID.value] = true

            await $fetch(`/api/product/${props.id}/images/${deleteImageID.value}`, {
                method: 'delete'
            })
                .then((a) => {
                    if (a.status == 'success') {
                        emit('update')
                    }
                })
                .finally(() => {
                    if (deleteImageID.value) {
                        loading.value[deleteImageID.value] = false
                        deleteImageID.value = null
                    }
                })
        }
    }

    const setAsFeatured = async (id: string) => {
        loading.value[id] = true

        await $fetch(`/api/product/${props.id}/images/${id}`, {
            method: 'put'
        })
            .then((a) => {
                if (a.status == 'success') {
                    emit('update')
                }
            })
            .finally(() => {
                loading.value[id] = false
            })
    }

    watch(viewImage, () => {
        showViewModal.value = viewImage.value != null
    })

    watch(deleteImageID, () => {
        showDeleteConfirm.value = deleteImageID.value != null
    })
</script>

<template>
    <div class="image__section">
        <label class="custom__file">
            <input type="file" @change="handleFileInput" name="file" multiple accept="image/*" />
            <div :class="{ 'custom__file__text': true, 'custom__file__text--has__files': files.length > 0 }">
                <ol class="custom__file__list">
                    <template v-if="files.length > 0">
                        <li class="custom__file__list__item" v-for="(file, index) in files">
                            <img :src="file.content" :alt="file.name">
                            <a href="#" @click.prevent="files.splice(index, 1)"><span class="icon-add"></span></a>
                        </li>
                        <li class="custom__file__list__item custom__file__list__item--last">
                            <div class="holder">
                                <span>You have selected {{ files.length }} image{{ files.length > 1 ? 's' : '' }}</span>
                                <button :class="{ 'btn btn__primary': true, 'loading': isLoading }" @click="saveImages">
                                    save images
                                </button>
                            </div>
                        </li>
                    </template>
                    <li class="custom__file__list__item" v-else>
                        <strong>Upload files</strong>
                        <em>(You can choose multiple images)</em>
                    </li>
                </ol>
            </div>
        </label>
        <div class="image__list">
            <figure :class="{ 'image': true, 'image--featured': image.featured }" v-for="image in images">
                <img :src="(image.images?.url as string)" alt="image description">
                <div class="image__action">
                    <span class="image__action__item" v-if="image.featured">
                        <MdiIcon icon="mdiStar" class="featured--icon text--warning" />
                    </span>
                    <Dropdown as="ul">
                        <template v-slot:opener="{ clickHandler }">
                            <a href="#"
                                :class="{ 'dropdown__opener image__action__item image__action__item--link': true, 'loading': loading[image.id] }"
                                @click.prevent="clickHandler">
                                <MdiIcon icon="mdiDotsVertical" size="24" v-if="!loading[image.id]" />
                            </a>
                        </template>
                        <li>
                            <a href="#" @click.prevent="deleteImageID = image.id">
                                Delete
                                <MdiIcon icon="mdiTrashCan" />
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="viewImage = (image.images?.url as string)">
                                view
                                <MdiIcon icon="mdiEye" />
                            </a>
                        </li>
                        <li v-if="!image.featured">
                            <a href="#" @click.prevent="setAsFeatured(image.id)">
                                Set as featured
                                <MdiIcon icon="mdiStarCircleOutline" />
                            </a>
                        </li>
                    </Dropdown>
                </div>
            </figure>
        </div>
        <Modal :show="showViewModal" size="xl" @modal:close="viewImage = null">
            <div class="image__holder" v-if="viewImage">
                <img :src="viewImage" alt="image description">
            </div>
        </Modal>

        <Confirm :show="showDeleteConfirm" title="Are you sure you want to delete?"
            text="Once you delete this image you cannot go back." @confirmed="deleteImage"
            @canceled="deleteImageID = null" cancel-text="No, not now" confirm-text="Yes, delete it" />
    </div>
</template>

<style scoped>
    .image__holder img {
        max-width: 100%
    }
</style>