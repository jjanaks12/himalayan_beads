<script lang="ts" setup>
  const sectionRef = ref<HTMLElement | null>(null)
  const { isVisible } = useViewport(sectionRef)

  // Data for the two banners, with a 'type' property to control the layout
  const banners = [{
    id: "consult",
    type: "split", // This type will render the half-text, half-image layout
    title: "Guidance awaits you",
    details: "Book a consultation today—get free guidance or a detailed session. Our experts are here to support your spiritual journey.",
    image: "/images/consultation.png", // The image of the person
    link: "/consultation",
    linkText: "Start your consultation"
  }, {
    id: "rudraksha",
    type: "image-only", // This type will render only the image, filling the card
    title: "The Sacred Rudraksha", // Alt text for the image
    image: "/images/custom-order.png", // The image of the Rudraksha on green background
    link: "/custom_order", // The image of the Rudraksha on green background
    linkText: ""
  }]
</script>

<template>
  <section ref="sectionRef" class="promotional__banners py-2 ">
    <div class="container mx-auto px-4">
      <h2 class="sr-only">Our Services and Special Offers</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <template v-for="(banner, index) in banners" :key="banner.id">
          <!-- Template #1: Split Banner (Consultation) -->
          <!-- MODIFIED: Added 'group' and 'relative' -->
          <div v-if="banner.type === 'split'"
            class="banner-card group relative overflow-hidden border border-[#E5E9EA] transition-all duration-700 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }" :style="{ transitionDelay: `${index * 100}ms` }">
            <!-- Background Image with Scale Animation -->
            <img :src="banner.image" :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
            <!-- Dark Overlay for Readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/150 via-black/230 to-transparent"></div>

            <!-- MODIFIED: Text Content now sits on top of the image -->
            <div class="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-center">
              <h3 class="text-xl lg:text-2xl font-bold text-[#100804] mb-4">
                {{ banner.title }}
              </h3>
              <div class="space-y-2">
                <p class="text-base text-[#100804]"> {{ banner.details }} </p>
                <NuxtLink :to="banner.link" as-child>
                  <Button>{{ banner.linkText }}</Button>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Template #2: Full Image Banner (Rudraksha) -->
          <!-- MODIFIED: Added 'group' -->
          <NuxtLink :to="banner.link" v-else-if="banner.type === 'image-only'"
            class="banner-card group relative overflow-hidden border border-[#E5E9EA] transition-all duration-700 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }" :style="{ transitionDelay: `${index * 100}ms` }">
            <img :src="banner.image" :alt="banner.title"
              class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
          </NuxtLink>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>

  /* A fixed height is recommended for layout consistency */
  .banner-card {
    height: 280px;
  }
</style>
