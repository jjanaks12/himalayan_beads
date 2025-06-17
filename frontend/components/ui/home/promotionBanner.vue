<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ZapIcon, ArrowDownIcon } from "lucide-vue-next";

const isVisible = ref(false);
const isHovered = ref(false);

onMounted(() => {
  // Trigger animation when component mounts
  setTimeout(() => {
    isVisible.value = true;
  }, 500);
});

const handleSignUp = () => {
  // Handle newsletter signup
  console.log("Newsletter signup clicked");
  // You can add your signup logic here
};
</script>

<template>
  <section
    class="promotion__banner py-4 relative overflow-hidden cursor-pointer"
    @click="handleSignUp"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 transition-transform duration-1000"
        :class="{
          'translate-x-full': isHovered,
          '-translate-x-full': !isHovered,
        }"
      ></div>
    </div>

    <div class="container mx-auto px-4">
      <div
        class="flex items-center justify-center gap-3 text-center transition-all duration-700 ease-out"
        :class="{
          'opacity-100 translate-y-0': isVisible,
          'opacity-0 translate-y-4': !isVisible,
        }"
      >
        <!-- Lightning Icon -->
        <ZapIcon
          class="h-5 w-5 text-[#FBB530] transition-all duration-300"
          :class="{
            'animate-pulse scale-110': isHovered,
            'scale-100': !isHovered,
          }"
        />

        <!-- Promotion Text -->
        <span
          class="text-[#0E2332] font-medium text-sm md:text-base uppercase tracking-wide transition-all duration-300"
          :class="{ 'scale-105': isHovered, 'scale-100': !isHovered }"
        >
          Sign Up Now & Get 15% Off
        </span>

        <!-- Down Arrow -->
        <ArrowDownIcon
          class="h-4 w-4 text-[#B7B5B4] transition-all duration-500"
          :class="{
            'animate-bounce translate-y-1': isHovered,
            'translate-y-0': !isHovered,
          }"
        />
      </div>
    </div>

    <!-- Ripple Effect on Click -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-1/2 left-1/2 w-0 h-0 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
        :class="{ 'w-96 h-96': isHovered }"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.promotion__banner {
  position: relative;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.promotion__banner:hover .shimmer {
  animation: shimmer 1s ease-out;
}
</style>
