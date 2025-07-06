<script lang="ts" setup>
  useHead({
    title: "Home page - Himalayan Beads",
    meta: [
      {
        name: "description",
        content:
          "Discover the beauty of Himalayan Beads. Experience the spiritual benefits of our authentic rudraksha products.",
      },
    ],
  });

  definePageMeta({
    layout: "default",
    auth: false,
  });

  import UiHomeHeroBanner from '~/components/pages/home/heroBanner.vue'
  // import UiHomePromotionBanner from '~/components/pages/home/promotionBanner.vue'
  import UiHomeFeature from '~/components/pages/home/features.vue'
  import UiHomeFeaturedProduct from '~/components/pages/home/featuredProducts.vue'
  import UiHomeFeaturedPromotion from '~/components/pages/home/featuredPromotion.vue'
  import faqReview from '~/components/pages/home/faqReview.vue'
  import callToActionVideo from '~/components/pages/home/callToActionVideo.vue'
  import infoBanner from '~/components/pages/home/infoBanner.vue'
  import blogSection from '~/components/pages/home/blogSection.vue'
</script>

<template>
  <div class="home__page">
    <UiHomeHeroBanner />
    <!-- <UiHomePromotionBanner /> -->
    <UiHomeFeature />
    <UiHomeFeaturedProduct />
    <UiHomeFeaturedPromotion />
    <faqReview />
    <callToActionVideo />
    <infoBanner />
    <blogSection />
  </div>
</template>

<style scoped>
  .home__page {
    min-height: 100vh;
  }
</style>
