<script lang="ts" setup>
import { ref, onMounted } from "vue";

// Animation states
const isLoaded = ref(false);
const showContent = ref(false);

onMounted(() => {
  // Trigger animations after component mounts
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);

  setTimeout(() => {
    showContent.value = true;
  }, 300);
});
</script>

<template>
  <section class="main__banner relative overflow-hidden">
    <!-- Background Image -->

    <div class="main__banner__bg absolute inset-0">
      <!-- <div
        class="absolute inset-0 bg-black/40 z-10 transition-opacity duration-1000"
        :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
      ></div> -->
      <img
        src="/images/img01.png"
        alt="Himalayan Rudraksha Beads"
        class="w-full h-full object-cover transition-transform duration-[3000ms] ease-out"
        :class="{ 'scale-105': isLoaded, 'scale-100': !isLoaded }"
      />
      <!-- <img src="/images/img01.png" alt="image description" /> -->
    </div>

    <!-- Content Overlay -->
    <div
      class="main__banner__caption relative z-20 min-h-[70vh] lg:min-h-[80vh] flex items-center"
    >
      <div class="container mx-auto px-4">
        <div class="holder max-w-2xl">
          <!-- Main Heading -->
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ease-out"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }"
          >
            Discover the beauty of Himalayan Beads.
          </h1>

          <!-- Subtitle -->
          <p
            class="text-lg md:text-xl text-white/90 mb-8 leading-relaxed transition-all duration-1000 ease-out delay-200"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }"
          >
            Experience the spiritual benefits of our authentic rudraksha
            products.
          </p>

          <!-- Button Group -->
          <div
            class="btn__group flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-400"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }"
          >
            <NuxtLink
              :to="{ name: 'product' }"
              class="btn btn__primary bg-[#A0522D] hover:bg-[#A0522D] text-white px-8 py-4 rounded-xs font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Explore All Products
            </NuxtLink>
            <a
              href="#about"
              class="btn btn__light border-2 border-white text-[#A0522D] bg-white hover:text-[#804224] px-8 py-4 rounded-xs font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main__banner {
  position: relative;
}
</style>
