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

import UiHomeHeroBanner from '~/components/ui/home/heroBanner.vue'
import UiHomePromotionBanner from '~/components/ui/home/promotionBanner.vue'
import UiHomeFeature from '~/components/ui/home/features.vue'
import UiHomeFeaturedProduct from '~/components/ui/home/featuredProducts.vue'
import UiHomeFeaturedPromotion from '~/components/ui/home/featuredPromotion.vue'
import faqReview from '~/components/ui/home/faqReview.vue'
import callToActionVideo from '~/components/ui/home/callToActionVideo.vue'
import infoBanner from '~/components/ui/home/infoBanner.vue'
import blogSection from '~/components/ui/home/blogSection.vue'



</script>

<template>
  <div class="home__page"> 
    <UiHomeHeroBanner />
    <UiHomePromotionBanner />
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
