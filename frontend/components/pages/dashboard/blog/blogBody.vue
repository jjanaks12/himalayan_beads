<script setup lang="ts">
    import { LoaderIcon, SaveIcon } from 'lucide-vue-next'

    import type { Blog } from '~/himalayan_beads'
    import { debounce } from '~/lib/filters'
    import { useBlogStore } from '~/store/blogStore'

    interface BlogBodyProps {
        blog: Blog
    }

    const props = defineProps<BlogBodyProps>()
    const emit = defineEmits(['update'])
    const route = useRoute()
    const { saveBody } = useBlogStore()
    const { can } = useAuthorization()

    const bodyText = ref('')
    const isLoading = ref(false)
    const isSaved = ref(false)

    const hasChanged = computed(() => bodyText.value !== props.blog.body)

    const save = async () => {
        isLoading.value = true

        await saveBody(route.params.id as string, bodyText.value)
        emit('update')
        isLoading.value = false
        isSaved.value = true
    }

    watch(() => props.blog, () => {
        if (props.blog)
            bodyText.value = props.blog.body || ''
    })

    watch(isSaved, () => {
        if (isSaved.value)
            debounce(() => { isSaved.value = false }, 2000)
    })

    onMounted(() => {
        if (props.blog)
            bodyText.value = props.blog.body || ''
    })
</script>

<template>
    <div class="mb-2">
        <div class="flex mb-2">
            <h2 class="text-lg grow">Blog content</h2>
            <div class="flex gap-1 text-sm items-center">
                <Button variant="secondary" size="sm" @click="save" v-if="hasChanged">
                    <LoaderIcon class="loading" :size="16" v-if="isLoading" />
                    <SaveIcon />
                    save
                </Button>
                <span class="text-green-700 flex gap-0.5 items-center" v-if="isSaved">
                    <SaveIcon :size="16" />
                    saved
                </span>
            </div>
        </div>
        <TiptapEditor v-model="bodyText" :disabled="isLoading || can('update_blog')" />
    </div>
</template>