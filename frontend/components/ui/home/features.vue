<script lang="ts" setup>
import { ref } from "vue";
import { useIntersectionObserver } from "@vueuse/core";

// --- Animation Logic using @vueuse/core ---
const featuresRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

useIntersectionObserver(
  featuresRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true;
    }
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);

// --- Component Data (Added a longer description for testing) ---
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
      "Lorem ipsum grön elcertifikat pabyggade om valstuyggade om valstuyggade om valstuyggade om valstuga att gensax spepuck i bloggosfar. This description is longer to properly test the multi-line clamping and equal height feature.",
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
</script>

<template>
  <section
    ref="featuresRef"
    class="features__section py-16 lg:py-24 bg-[#F8F9FA]"
  >
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
      >
        <!--
          MODIFICATION FOR EQUAL HEIGHTS:
          - `flex flex-col` turns the card into a flex container.
        -->
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="feature__item text-center group transition-all duration-700 ease-out flex flex-col"
          :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-8': !isVisible,
          }"
          :style="{
            transitionDelay: `${index * 150}ms`,
          }"
        >
          <!-- Icon Placeholder (Design-accurate styling) -->
          <div class="feature__icon mb-6 flex justify-center">
            <div
              class="icon__placeholder w-16 h-16 bg-slate-400 shadow-sm transition-all duration-500 ease-out group-hover:bg-slate-500 group-hover:shadow-md group-hover:scale-105 group-hover:rotate-3"
            ></div>
          </div>

          <!-- Feature Title (with line clamp) -->
          <h3
            class="feature__title text-sm lg:text-base font-bold text-gray-800 mb-3 uppercase tracking-wide leading-tight transition-colors duration-300 group-hover:text-[#804224] min-h-[2.75rem] flex items-center justify-center line-clamp-2"
          >
            {{ feature.title }}
          </h3>

          <!-- 
            MODIFICATION FOR EQUAL HEIGHTS:
            - `flex-grow` makes the description expand to fill available space.
            - `line-clamp-4` truncates text after 4 lines.
          -->
          <p
            class="feature__description text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 flex-grow line-clamp-4"
          >
            {{ feature.description }}
          </p>

          <!-- Hover Effect Line -->
          <div
            class="feature__line w-0 h-0.5 bg-[#804224] mx-auto mt-5 transition-all duration-500 ease-out group-hover:w-12"
          ></div>
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
