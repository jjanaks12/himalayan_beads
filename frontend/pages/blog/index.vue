<script lang="ts" setup>
    import { useBlogStore } from '~/store/blogStore'
    import BlogItem from '~/components/pages/home/blogSection/item.vue'

    useHead({
        title: 'Blogs'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const { isVisible } = useViewport(sectionRef)
    const { blogs, params } = storeToRefs(useBlogStore())
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
        <h1 class="text-2xl lg:text-3xl font-bold">Products</h1>
    </div>
    <section ref="sectionRef" class="featured__products py-4 lg:py-18">
        <div class="container">
            <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                <BlogItem v-for="(blog, index) in blogs" :post="blog" :index="index" />
            </div>
            <div class="flex items-center justify-end space-x-2 py-4">
                <div class="flex-1 text-sm text-muted-foreground">
                    {{ params?.current }} of {{ params?.total_page }} pages
                </div>
                <div class="space-x-2">
                    <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                        :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                        <PaginationContent v-slot="{ items }">
                            <PaginationPrevious />
                            <template v-for="(item, index) in items" :key="index">
                                <PaginationItem v-if="item.type === 'page'" :value="item.value"
                                    :is-active="item.value === page">
                                    {{ item.value }}
                                </PaginationItem>
                            </template>
                            <PaginationEllipsis :index="4" />
                            <PaginationNext />
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    </section>
</template>