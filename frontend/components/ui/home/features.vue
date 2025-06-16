<script lang="ts" setup>
import { ref, onMounted } from "vue";

// Animation states
const isVisible = ref(false);
const featuresRef = ref<HTMLElement>();

// Features data
const features = [
  {
    id: 1,
    title: "SHOP PREMIUM QUALITY PRODUCTS",
    description:
      "Lorem ipsum grön elcertifikat pabyggade om valstuga att gensax spepuck i bloggosfar.",
  },
  {
    id: 2,
    title: "ENERGIZED RUDRAKSHA",
    description:
      "Lorem ipsum grön elcertifikat pabyggade om valstuga att gensax spepuck i bloggosfar.",
  },
  {
    id: 3,
    title: "EFFORTLESS SHOPPING, EASY RETURNS",
    description:
      "Lorem ipsum grön elcertifikat pabyggade om valstuga att gensax spepuck i bloggosfar.",
  },
  {
    id: 4,
    title: "OUR SPEEDY SHIPPING PROMISE",
    description:
      "Lorem ipsum grön elcertifikat pabyggade om valstuga att gensax spepuck i bloggosfar.",
  },
];

onMounted(() => {
  // Create intersection observer for scroll animations
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
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  if (featuresRef.value) {
    observer.observe(featuresRef.value);
  }
});
</script>

<template>
  <section
    ref="featuresRef"
    class="features__section py-16 lg:py-24 bg-[#F3F3F3]"
  >
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
      >
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="feature__item text-center group transition-all duration-700 ease-out"
          :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-8': !isVisible,
          }"
          :style="{
            transitionDelay: `${index * 150}ms`,
          }"
        >
          <!-- Icon Placeholder -->
          <div class="feature__icon mb-6 flex justify-center">
            <div
              class="icon__placeholder w-16 h-16 bg-gray-400 transition-all duration-500 ease-out group-hover:bg-gray-500 group-hover:scale-110 group-hover:rotate-3"
              :class="{
                'animate-pulse': !isVisible,
                'shadow-lg': isVisible,
              }"
            >
              <!-- Future icon will replace this placeholder -->
            </div>
          </div>

          <!-- Feature Title -->
          <h3
            class="feature__title text-sm lg:text-base font-bold text-gray-800 mb-4 uppercase tracking-wide leading-tight transition-colors duration-300 group-hover:text-[#804224]"
          >
            {{ feature.title }}
          </h3>

          <!-- Feature Description -->
          <p
            class="feature__description text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700"
          >
            {{ feature.description }}
          </p>

          <!-- Hover Effect Line -->
          <div
            class="feature__line w-0 h-0.5 bg-[#804224] mx-auto mt-4 transition-all duration-500 ease-out group-hover:w-12"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

.icon__placeholder::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
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
