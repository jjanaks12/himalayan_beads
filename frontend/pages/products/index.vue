<script lang="ts" setup>
    import { useIntersectionObserver } from '@vueuse/core'
    import ProductItem from '~/components/pages/home/productItem.vue'
    import { useProductStore } from '~/store/product'

    const route = useRoute()

    useHead({
        title: route.query.page ? `Products :: page ${route.query.page}` : 'Products'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })

    const { products, params } = storeToRefs(useProductStore())
    const sectionRef = ref<HTMLElement | null>(null)
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

    onMounted(() => {
        if (route.query.page)
            params.value = { ...params.value, current: parseInt(route.query.page as string) }
    })
</script>

<template>
    <section ref="sectionRef" class="featured__products py-4 lg:py-4">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12 transition-all duration-800 ease-out" :class="{
                'opacity-100 translate-y-0': isVisible,
                'opacity-0 translate-y-6': !isVisible,
            }">
                <h2 class="text-2xl lg:text-3xl font-bold text-gray-800">
                    Featured This Week: Discover Our Best Rudraksha Collection
                </h2>
            </div>

            <div class="products__grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
                <ProductItem v-for="(item, index) in products" :key="item.id" :product="item" :index="index"
                    :show="isVisible" />
            </div>
            <div class="text-right">
                <NuxtLink :to="{ name: 'products', query: { page: params.current + 1 } }">view more</NuxtLink>
            </div>
        </div>
    </section>
</template>