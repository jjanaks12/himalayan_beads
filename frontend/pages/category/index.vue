<script lang="ts" setup>
    import { useIntersectionObserver } from '@vueuse/core'
    import ProductItem from '~/components/pages/home/productItem.vue'
    import type { Category, Product } from '~/himalayan_beads'
    import { useAxios } from '~/services/axios'

    const route = useRoute()
    const { axios } = useAxios()

    useHead({
        title: 'Category :: ' + route.query.slug
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const category = ref<Category>()
    const products = ref<Product[]>()
    const isVisible = ref(false)

    useIntersectionObserver(
        sectionRef,
        ([{ isIntersecting }]) => {
            if (isIntersecting) {
                isVisible.value = true
            }
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const productsByCatgoryName = async () => {
        const { data } = await axios.get<Category>('products/by_category/' + route.query.slug)
        category.value = data
        products.value = data.products
    }

    onBeforeMount(() => {
        productsByCatgoryName()
    })
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14" :class="{
        'opacity-100 translate-y-0': isVisible,
        'opacity-0 translate-y-6': !isVisible,
    }">
        <h2 class="text-2xl lg:text-3xl font-bold">
            {{ category?.name }}
        </h2>
        <div class="text" v-html="category?.description" />
    </div>
    <section ref="sectionRef" class="featured__products py-4 lg:py-14">
        <div class="container mx-auto px-4">

            <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                <ProductItem v-for="(item, index) in products" :key="item.id" :product="item" :index="index"
                    :show="isVisible" />
            </div>
        </div>
    </section>
</template>