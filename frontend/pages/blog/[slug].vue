<script lang="ts" setup>
    import type { Blog } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useBlogStore } from '~/store/blogStore'

    const route = useRoute()

    useHead({
        title: 'Blogs'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const { getBlogBySlug } = useBlogStore()
    const { isVisible } = useViewport(sectionRef)

    const blog = ref<Blog | null>(null)
    const isLoading = ref(false)

    onBeforeMount(async () => {
        isLoading.value = true
        blog.value = await getBlogBySlug(route.params.slug as string)
        isLoading.value = false
    })
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'" ref="sectionRef">
        <h1 class="text-2xl lg:text-3xl font-bold">{{ blog?.title }}</h1>
        <em class="not-italic">{{ blog?.category?.name }}</em>
    </div>
    <section class="py-14">
        <div class="container">
            <div class="flex gap-4">
                <div class="w-2/3">
                    <figure class="w-full rounded overflow-hidden mb-4">
                        <img :src="showImage(blog?.image?.name as string)" :alt="blog?.title" class="w-full h-auto">
                    </figure>
                    <div class="bg-green-300 text-lg p-4 rounded mb-4">
                        <p>{{ blog?.excerpt }}</p>
                    </div>
                    <div class="text__holder" v-html="blog?.body" />
                </div>
                <div class="w-1/3">
                    <h2 class="mb-1">Author</h2>
                    <strong class="block mb-4">{{ blog?.user?.first_name }} {{ blog?.user?.last_name }}</strong>
                    <h2 class="mb-1">Tags</h2>
                    <div class="flex gap-2 mb-4">
                        <Badge variant="new" v-for="tag in blog?.tags">{{ tag.name }}</Badge>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>