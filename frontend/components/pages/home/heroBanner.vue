<script lang="ts" setup>
  const isLoaded = ref(false)
  const showContent = ref(false)

  onMounted(() => {
    setTimeout(() => {
      isLoaded.value = true
    }, 100)

    setTimeout(() => {
      showContent.value = true
    }, 300)
  });
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="main__banner__bg absolute inset-0">
      <img src="/images/banner2.png" alt="Himalayan Rudraksha Beads"
        class="w-full h-full object-cover transition-transform duration-[3000ms] ease-out"
        :class="{ 'scale-105': isLoaded, 'scale-100': !isLoaded }" />
    </div>
    <div class="main__banner__caption relative z-20 min-h-[70vh] lg:min-h-[80vh] flex items-center">
      <div class="container mx-auto px-4">
        <div class="holder max-w-2xl">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ease-out"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }">Discover the beauty of Himalayan Beads.</h1>
          <p class="text-lg md:text-xl text-white/90 mb-8 leading-relaxed transition-all duration-1000 ease-out delay-200"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }">Experience the spiritual benefits of our authentic Rudraksha products, handcrafted to bring peace,
            prosperity, and positive energy into your life.</p>
          <div class="btn__group flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-400"
            :class="{
              'opacity-100 translate-y-0': showContent,
              'opacity-0 translate-y-8': !showContent,
            }">
            <NuxtLink :to="{ name: 'products' }"
              class="btn btn__primary bg-[#A0522D] hover:bg-[#A0522D] text-white px-8 py-4 rounded-xs font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Explore All Products
            </NuxtLink>
            <NuxtLink to="/about"
              class="btn btn__light border-2 border-white text-[#A0522D] bg-white hover:text-[#804224] px-8 py-4 rounded-xs font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105">
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>