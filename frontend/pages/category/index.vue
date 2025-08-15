<script lang="ts" setup>
    import type { Blog, Category, Product } from '~/himalayan_beads'
    import { useAxios } from '~/services/axios'
    import { useCatgoryStore } from '~/store/category'

    import ProductItem from '~/components/pages/home/productItem.vue'
    import BlogItem from '~/components/pages/home/blogSection/item.vue'

    const route = useRoute()
    const { axios } = useAxios()

    useHead({
        title: 'Category :: ' + route.query.slug
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const category = ref<Category>()
    const products = ref<Product[]>()
    const blogs = ref<Blog[]>()
    const { isVisible } = useViewport(sectionRef)
    const { categoryWithProduct } = useCatgoryStore()

    const productsByCatgoryName = async () => {
        const { data } = await axios.get<Category>('categories/by_slug/' + route.query.slug)
        category.value = data
        if (data.type == 'PRODUCT')
            products.value = data.products
        else
            blogs.value = data.blogs
    }

    watch(() => route.query, () => {
        productsByCatgoryName()
    }, { deep: true, immediate: true })

    onBeforeMount(() => {
        productsByCatgoryName()
    })
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'" ref="sectionRef">
        <div class="container">
            <h2 class="text-2xl lg:text-3xl font-bold mb-2">
                {{ category?.name }}
            </h2>
            <div class="text mb-2" v-html="category?.description" />
            <div class="flex flex-wrap gap-3 justify-center">
                <template v-for="cat in categoryWithProduct">
                    <Badge v-if="cat.id !== category?.id">{{ cat.name }}</Badge>
                </template>
            </div>
        </div>
    </div>
    <template v-if="category">
        <section class="py-4 lg:py-14" v-if="category?.type == 'PRODUCT'">
            <div class="container mx-auto px-4">
                <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                    <ProductItem v-for="(item, index) in products" :key="item.id" :product="item" :index="index"
                        :show="isVisible" />
                </div>
            </div>
        </section>
        <section class="py-4 lg:py-14" v-if="category?.type == 'BLOG'">
            <div class="container mx-auto px-4">
                <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                    <BlogItem v-for="(item, index) in blogs" :key="item.id" :post="item" :index="index"
                        :show="isVisible" />
                </div>
            </div>
        </section>
    </template>
</template>