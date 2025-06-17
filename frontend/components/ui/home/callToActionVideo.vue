<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { CircleCheckIcon, PlayIcon, PauseIcon } from "lucide-vue-next";

// --- YOUR SCRIPT IS UNTOUCHED AND REMAINS PERFECT ---
const isVisible = ref(false);
const sectionRef = ref<HTMLElement>();
const videoRef = ref<HTMLVideoElement>();
const isPlaying = ref(false);
const showControls = ref(true);

const benefits = [
  "Authentic Rudraksha Beads for Spiritual Awakening",
  "Enhance Your Meditation Practice with Sacred Rudraksha Beads",
  "Find Inner Peace and Balance with our Rudraksha Collection",
];

const toggleVideo = () => {
  if (!videoRef.value) return;
  if (isPlaying.value) {
    videoRef.value.pause();
    isPlaying.value = false;
  } else {
    videoRef.value.play();
    isPlaying.value = true;
  }
  showControls.value = true;
  setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false;
    }
  }, 2000);
};

const handleVideoEnded = () => {
  isPlaying.value = false;
  showControls.value = true;
};
const handleVideoClick = () => {
  toggleVideo();
};
const handleMouseEnter = () => {
  showControls.value = true;
};
const handleMouseLeave = () => {
  if (isPlaying.value) {
    setTimeout(() => {
      showControls.value = false;
    }, 1000);
  }
};

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
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );
  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<template>
  <!-- 
    MODIFIED: The section is now relative and has the full-bleed background color.
    The grid is moved INSIDE the container.
  -->
  <section
    ref="sectionRef"
    class="cta__video__section relative bg-[#100804] py-16 lg:py-0"
  >
    <div class="container mx-auto px-4">
      <div
        class="grid grid-cols-1 pr-6 lg:grid-cols-5 gap-8 min-h-[500px] lg:min-h-[600px]"
      >
        <!-- 
          Left Column - Text is now inside the container.
          Spans 2/5 of the container's width on desktop.
        -->
        <div
          class="content__column lg:col-span-2 pr-6 flex flex-col justify-center transition-all duration-800 ease-out"
          :class="{
            'opacity-100 translate-x-0': isVisible,
            'opacity-0 -translate-x-12': !isVisible,
          }"
        >
          <!-- Main Heading -->
          <h3
            class="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight transition-all duration-800 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-6': !isVisible,
            }"
            style="transition-delay: 200ms"
          >
            Buy Premium Rudraksha Beads Now!
          </h3>

          <!-- Subtitle -->
          <p
            class="text-lg lg:text-xl text-white/90 mb-8 transition-all duration-800 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-6': !isVisible,
            }"
            style="transition-delay: 400ms"
          >
            Experience Their Powerful Benefits
          </p>

          <!-- Benefits List -->
          <div class="benefits__list space-y-4 mb-10">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="benefit__item flex items-start gap-3 transition-all duration-600 ease-out"
              :class="{
                'opacity-100 translate-x-0': isVisible,
                'opacity-0 -translate-x-6': !isVisible,
              }"
              :style="{ transitionDelay: `${600 + index * 150}ms` }"
            >
              <CircleCheckIcon
                class="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5"
              />
              <span class="text-white text-base lg:text-lg leading-relaxed">
                {{ benefit }}
              </span>
            </div>
          </div>

          <!-- CTA Button -->
          <div
            class="cta__button transition-all duration-800 ease-out"
            :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-6': !isVisible,
            }"
            style="transition-delay: 1200ms"
          >
            <button
              class="learn__more__btn cursor-pointer bg-[#A0522D] text-white px-8 py-4 rounded-sm font-semibold uppercase tracking-wide transition-all duration-300 transform hover:scale-105"
            >
              Learn More Rudraksha
            </button>
          </div>
        </div>

        <!-- 
          Right Column Placeholder - This div is empty on desktop.
          It simply pushes the left column into the correct 2/5 position.
          It is hidden on mobile.
        -->
        <div class="hidden lg:block lg:col-span-3"></div>
      </div>
    </div>

    <!-- 
      MODIFIED: The video is now absolutely positioned relative to the section.
      This allows it to "break out" of the container and go full-bleed.
      On mobile, it is relative and falls below the text content.
    -->
    <div
      class="video__column relative lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-[56%] transition-all duration-800 ease-out"
      :class="{
        'opacity-100 translate-x-0': isVisible,
        'opacity-0 translate-x-12': !isVisible,
      }"
      style="transition-delay: 300ms"
    >
      <div
        class="video__container relative w-full h-full cursor-pointer group"
        @click="handleVideoClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <!-- Video Element -->
        <video
          ref="videoRef"
          class="w-full h-full object-cover"
          @ended="handleVideoEnded"
          muted
          loop
          preload="metadata"
          poster="/images/Video.png"
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
        </video>
        <!-- All video controls and overlays are unchanged -->
        <div
          class="video__overlay absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"
          :class="{
            'opacity-100': showControls || !isPlaying,
            'opacity-0': !showControls && isPlaying,
          }"
        ></div>
        <div
          class="video__controls absolute inset-0 flex items-center justify-center transition-all duration-300"
          :class="{
            'opacity-100 scale-100': isVisible && (showControls || !isPlaying),
            'opacity-0 scale-75': !showControls && isPlaying,
          }"
        >
          <div
            class="control__button bg-white/95 hover:bg-white rounded-full p-4 lg:p-6 shadow-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          >
            <PlayIcon
              v-if="!isPlaying"
              class="h-8 w-8 lg:h-12 lg:w-12 text-gray-800 ml-1"
            />
            <PauseIcon v-else class="h-8 w-8 lg:h-12 lg:w-12 text-gray-800" />
          </div>
        </div>
        <div
          v-if="!isPlaying"
          class="pulse__ring absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div
            class="pulse__circle bg-white/30 rounded-full animate-ping"
            style="width: 120px; height: 120px"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Your styles are great, just a minor adjustment for consistency */
.cta__video__section {
  position: relative;
  overflow-x: clip; /* Prevents any potential horizontal scrollbar */
}

/* This ensures the video has a minimum height on mobile */
.video__column {
  min-height: 400px;
}
@media (min-width: 1024px) {
  .video__column {
    min-height: inherit; /* Resets min-height on desktop */
  }
}
.control__button {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
.pulse__circle {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
}
</style>
