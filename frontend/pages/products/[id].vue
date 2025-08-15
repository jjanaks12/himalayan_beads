<script lang="ts" setup>
    import { HeartIcon, HomeIcon, ShoppingBasketIcon, SlashIcon } from 'lucide-vue-next'
    import { Swiper as SwiperWrapper, SwiperSlide } from 'swiper/vue'
    import { FreeMode, Thumbs } from 'swiper/modules'

    import type { Product } from '~/himalayan_beads'
    import { showImage } from '~/lib/filters'
    import { useProductStore } from '~/store/product'

    import ProductDetailLoader from '@/components/pages/product/detail/loading.vue'
    import { useCartStore } from '~/store/cartStore'
    import type { Swiper } from 'swiper/types'

    const route = useRoute()
    const { toggleWishlist, isWishlisted, isCarted, addToCart } = useCartStore()

    useHead({
        title: route.query.page ? `Products :: page ${route.query.page}` : 'Products'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })

    const { getProduct } = useProductStore()
    const product = ref<Product | null>(null)
    const isLoading = ref(false)
    const thumbnailSwiper = ref<Swiper | null>(null)

    const currentPrice = computed(() => product.value?.prices && product.value?.prices.length > 0
        ? product.value?.prices[product.value?.prices.length - 1]
        : null)
    const oldPrice = computed(() => product.value?.prices && product.value?.prices.length > 0
        ? product.value?.prices[Math.max(product.value?.prices.length - 2, 0)].amount
        : 0)

    onBeforeMount(async () => {
        isLoading.value = true
        product.value = await getProduct(route.params.id as string)
        isLoading.value = false
    })
</script>

<template>
    <section class="py-14">
        <div class="container">
            <div class="flex gap-4" v-if="!isLoading && product != null">
                <div class="w-1/3">
                    <SwiperWrapper class="mb-3" :thumbs="{ swiper: thumbnailSwiper }" :modules="[Thumbs]">
                        <SwiperSlide v-for="image in product?.images">
                            <img :src="showImage(image.image.name)" :alt="product?.name">
                        </SwiperSlide>
                    </SwiperWrapper>
                    <SwiperWrapper :slides-per-view="3.5" :space-between="12"
                        @swiper="(swiper) => thumbnailSwiper = swiper" :modules="[FreeMode]" free-mode
                        watch-slides-progress>
                        <SwiperSlide v-for="image in product?.images">
                            <img :src="showImage(image.image.name)" :alt="product?.name">
                        </SwiperSlide>
                    </SwiperWrapper>
                </div>
                <article class="w-2/3">
                    <Breadcrumb class="mb-2">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    <HomeIcon :size="14" />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/products">
                                    Products
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{{ product?.name }}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div class="mb-3">
                        <h1 class="text-2xl">{{ product?.name }}</h1>
                        <Badge class="inline-block align-top mb-2">
                            <NuxtLink :to="{ name: 'category', query: { slug: product?.category.slug } }" as-child>
                                {{ product?.category.name.toUpperCase() }}
                            </NuxtLink>
                        </Badge>
                        <em class="flex gap-2 not-italic">
                            <s v-if="oldPrice != currentPrice?.amount">${{ oldPrice }}</s>
                            <strong class="text-xl">${{ currentPrice?.amount }}</strong>
                        </em>
                    </div>
                    <div class="mb-3" v-html="product?.description" />
                    <div class="flex gap-3">
                        <Button v-if="!isCarted(product.id) && currentPrice"
                            @click.stop="addToCart(product, currentPrice)" role="User">
                            <ShoppingBasketIcon />
                            ADD TO CART
                        </Button>
                        <Button variant="ghost" size="icon" @click.stop="toggleWishlist(product)" role="User">
                            <HeartIcon :class="{ 'fill-current': isWishlisted(product.id) }" />
                        </Button>
                    </div>
                </article>
            </div>
            <ProductDetailLoader v-else />
        </div>
    </section>
</template>