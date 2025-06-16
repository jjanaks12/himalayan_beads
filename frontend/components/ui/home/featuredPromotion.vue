<script lang="ts" setup>
import { ref, onMounted } from "vue";

// Animation states to match your existing pattern
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

// Data for the two banners, with a 'type' property to control the layout
const banners = [
  {
    id: "consult",
    type: "split", // This type will render the half-text, half-image layout
    title: "Consultation Block Banner",
    details: ["Astrology", "Purpose Method"],
    image: "/images/product05.png", // The image of the person
  },
  {
    id: "rudraksha",
    type: "image-only", // This type will render only the image, filling the card
    title: "The Sacred Rudraksha", // Alt text for the image
    image: "/images/product06.png", // The image of the Rudraksha on green background
  },
];

// Replicating the exact on-scroll animation logic
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<template>
  <section ref="sectionRef" class="promotional__banners py-16 lg:py-20">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <template v-for="(banner, index) in banners" :key="banner.id">
          <!-- Template #1: Split Banner (Consultation) -->
          <!-- MODIFIED: Added 'group' and 'relative' -->
          <div
            v-if="banner.type === 'split'"
            class="banner-card group relative overflow-hidden border border-[#E5E9EA] transition-all duration-700 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <!-- Background Image with Scale Animation -->
            <img
              :src="banner.image"
              :alt="banner.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <!-- Dark Overlay for Readability -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-black/150 via-black/230 to-transparent"
            ></div>

            <!-- MODIFIED: Text Content now sits on top of the image -->
            <div
              class="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-center"
            >
              <h3 class="text-xl lg:text-2xl font-bold text-[#100804] mb-4">
                {{ banner.title }}
              </h3>
              <div class="space-y-2">
                <p
                  v-for="detail in banner.details"
                  :key="detail"
                  class="text-base text-[#100804]"
                >
                  {{ detail }}
                </p>
              </div>
            </div>
          </div>

          <!-- Template #2: Full Image Banner (Rudraksha) -->
          <!-- MODIFIED: Added 'group' -->
          <div
            v-else-if="banner.type === 'image-only'"
            class="banner-card group relative overflow-hidden border border-[#E5E9EA] transition-all duration-700 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-8': !isVisible,
            }"
            :style="{ transitionDelay: `${index * 100}ms` }"
          >
            <!-- MODIFIED: Added transition and group-hover classes -->
            <img
              :src="banner.image"
              :alt="banner.title"
              class="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
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
