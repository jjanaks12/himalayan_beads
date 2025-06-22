<script lang="ts" setup>
import { ref } from "vue";
import { useIntersectionObserver, useElementHover, useEventListener } from "@vueuse/core";
import { CircleCheckIcon, PlayIcon, PauseIcon } from "lucide-vue-next";

// --- STATE REFS ---
const sectionRef = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);
const videoContainerRef = ref<HTMLElement | null>(null);

const isVisible = ref(false); // For on-scroll animation
const isPlaying = ref(false);
const showControls = ref(true);

// --- CLEANER HOVER LOGIC with @vueuse/core ---
const isHoveringVideo = useElementHover(videoContainerRef);

// --- COMPONENT DATA ---
const benefits = [
  "Authentic Rudraksha Beads for Spiritual Awakening",
  "Enhance Your Meditation Practice with Sacred Rudraksha Beads",
  "Find Inner Peace and Balance with our Rudraksha Collection",
];

// --- CORE FUNCTIONS ---
const toggleVideo = () => {
  if (!videoRef.value) return;
  if (videoRef.value.paused) {
    videoRef.value.play();
    isPlaying.value = true;
  } else {
    videoRef.value.pause();
    isPlaying.value = false;
  }
};

// --- LIFECYCLE & EVENT LISTENERS ---
useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) { isVisible.value = true; }
  },
  { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
);

// This handles the video ending on its own
useEventListener(videoRef, 'ended', () => {
  isPlaying.value = false;
});

// This handles the play/pause state change (e.g., from native controls if shown)
useEventListener(videoRef, 'play', () => isPlaying.value = true);
useEventListener(videoRef, 'pause', () => isPlaying.value = false);
</script>

<template>
  <section ref="sectionRef" class="cta__video__section relative bg-[#100804] lg:py-0">
    <!-- 
      On mobile (py-16), this container holds the text.
      On desktop (lg), this grid structure creates the 2/5 and 3/5 column split.
    -->
    <div class="container mx-auto px-4 py-16 lg:py-0">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:min-h-[600px]">
        
        <!-- Left Column - Text Content -->
        <div
          class="content__column lg:col-span-2 flex flex-col justify-center transition-all duration-800 ease-out"
          :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 -translate-x-12': !isVisible }"
          style="transition-delay: 100ms"
        >
          <h2 class="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
            Buy Premium Rudraksha Beads Now!
          </h2>
          <p class="text-lg lg:text-xl text-white/90 mb-8">
            Experience Their Powerful Benefits
          </p>
          <div class="benefits__list space-y-4 mb-10">
            <div
              v-for="(benefit, index) in benefits" :key="index"
              class="benefit__item flex items-start gap-3 transition-all duration-500 ease-out"
              :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 -translate-x-6': !isVisible }"
              :style="{ transitionDelay: `${400 + index * 150}ms` }"
            >
              <CircleCheckIcon class="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
              <span class="text-white text-base lg:text-lg leading-relaxed">{{ benefit }}</span>
            </div>
          </div>
          <div
            class="cta__button transition-opacity duration-800"
            :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
            :style="{ transitionDelay: '1000ms' }"
          >
            <button class="learn__more__btn bg-[#A0522D] text-white px-8 py-4 rounded-sm font-semibold uppercase tracking-wide transition-transform duration-300 hover:scale-105">
              Learn More Rudraksha
            </button>
          </div>
        </div>

        <!-- This empty div pushes the text to the left 2/5ths on desktop only -->
        <div class="hidden lg:block lg:col-span-3"></div>
      </div>
    </div>

    <!-- 
      Right Column - Video. 
      - On desktop (lg), it's positioned absolutely to the right of the entire section.
      - On mobile, it's relative and appears after the text content naturally.
    -->
    <div
      class="video__column relative lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-[56%] transition-all duration-800 ease-out"
      :class="{ 'opacity-100 translate-x-0': isVisible, 'opacity-0 translate-x-12': !isVisible }"
      style="transition-delay: 200ms"
    >
      <div
        ref="videoContainerRef"
        class="video__container relative w-full h-full cursor-pointer group"
        @click="toggleVideo"
      >
        <video
          ref="videoRef"
          class="w-full h-full object-cover"
          muted
          loop
          playsinline
          preload="metadata"
          poster="/images/Video.png"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
        
        <!-- Overlay -->
        <div
          class="video__overlay absolute inset-0 bg-black/20 transition-opacity duration-300"
          :class="isPlaying && !isHoveringVideo ? 'opacity-0' : 'opacity-100'"
        ></div>

        <!-- Play/Pause Button -->
        <div
          class="video__controls absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none"
          :class="{
            'opacity-100 scale-100': !isPlaying || isHoveringVideo,
            'opacity-0 scale-75': isPlaying && !isHoveringVideo,
          }"
        >
          <div class="control__button bg-white/80 rounded-full p-4 lg:p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <PlayIcon v-if="!isPlaying" class="h-8 w-8 lg:h-12 lg:w-12 text-gray-800 ml-1" />
            <PauseIcon v-else class="h-8 w-8 lg:h-12 lg:w-12 text-gray-800" />
          </div>
        </div>
        
        <!-- Pulsing Ring (only when paused) -->
        <div
          v-if="!isPlaying"
          class="pulse__ring absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div class="pulse__circle bg-white/30 rounded-full animate-ping" style="width: 120px; height: 120px"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta__video__section {
  overflow-x: clip; /* Prevents horizontal scrollbar from animation */
}

/* This is key for the mobile layout */
.video__column {
  min-height: 400px; /* Ensures video has a good height on mobile */
}

@media (min-width: 1024px) {
  /* On desktop, the absolute positioning takes over, so we don't need a min-height */
  .video__column {
    min-height: inherit; 
  }
}

.control__button {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.pulse__circle {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
}
</style>