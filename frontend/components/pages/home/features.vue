<script lang="ts" setup>
  const featuresRef = ref<HTMLElement | null>(null)
  const { isVisible } = useViewport(featuresRef)

  const features = [{
    id: 1,
    icon: '/images/icon-shop_premium.png',
    title: "Shop Premium Quality Products",
    description: "We offer handpicked, authentic Rudraksha beads sourced directly from the Himalayas—carefully inspected for quality and spiritual integrity.",
  }, {
    id: 2,
    icon: '/images/icon-energized_rudraksha.png',
    title: "Energized Rudraksha",
    description: "Each bead is ritually energized by experts to enhance its spiritual power, supporting your meditation, healing, and personal growth journey.",
  }, {
    id: 3,
    icon: '/images/icon-effortless.png',
    title: "Effortless Shopping, Easy Returns",
    description: "Enjoy a smooth online shopping experience with secure checkout, quick assistance, and a no-hassle return policy for your peace of mind.",
  }, {
    id: 4,
    icon: '/images/icon-speed_delivery.png',
    title: "Our Speedy Shipping Promise",
    description: "We ensure fast and reliable delivery so you can receive your spiritual tools quickly—no delays, just dependable service worldwide.",
  }]
</script>

<template>
  <section ref="featuresRef" class="features__section py-16 lg:py-24 bg-[#F8F9FA]">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        <div v-for="(feature, index) in features" :key="feature.id"
          class="feature__item text-center group transition-all duration-700 ease-out flex flex-col" :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-8': !isVisible,
          }" :style="{ transitionDelay: `${index * 150}ms` }">
          <div
            class="icon__placeholder w-28 aspect-square transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-3 mb-6 flex mx-auto">
            <img :src="feature.icon" :alt="feature.title">
          </div>
          <h3
            class="feature__title text-sm lg:text-base font-bold text-gray-800 mb-3 uppercase tracking-wide leading-tight transition-colors duration-300 group-hover:text-[#804224] min-h-[2.75rem] line-clamp-2">
            {{ feature.title }}
          </h3>
          <div
            class="feature__description text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 flex-grow line-clamp-4">
            <p>{{ feature.description }}</p>
          </div>
          <div class="feature__line w-0 h-0.5 bg-[#804224] mx-auto mt-5 transition-all duration-500 ease-out group-hover:w-12" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

  /* Restoring your original custom styles for the shimmer effect and animations */
  .features__section {
    position: relative;
  }

  .feature__item {
    transform-origin: center bottom;
  }

  .icon__placeholder {
    position: relative;
    overflow: hidden;
  }

  /* This is the shimmer/shine effect from your original code */
  .icon__placeholder::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent);
    transition: left 0.8s ease-out;
  }

  .group:hover .icon__placeholder::before {
    left: 100%;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .feature__item {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 1024px) {
    .feature__title {
      font-size: 0.875rem;
      line-height: 1.3;
    }
  }

  /* Animation keyframes */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .feature__item.animate-in {
    animation: fadeInUp 0.6s ease-out forwards;
  }
</style>
