<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { GlobeIcon, HeadsetIcon } from "lucide-vue-next";

// Animation states
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

// Data-driven approach for the cards makes it easy to add more or edit
const infoCards = ref([
  {
    id: "shipping",
    icon: GlobeIcon,
    title: "Worldwide Fast Shipping",
    description:
      "Get free access to unique experiences and hottest brands on the internet tried & tested by the LBB crew.",
    colors: {
      bg: "bg-[#BDDCBD]",
      iconBg: "bg-[#F4FAEA]",
      iconText: "text-[#228B22]",
      titleText: "text-[#228B22]",
    },
  },
  {
    id: "help",
    icon: HeadsetIcon,
    title: "Need help? We got you",
    description:
      'You can find more information on the <a href="/faq" class="font-semibold underline text-slate-700 hover:text-amber-700 transition-colors">FAQs</a>. You can also contact us for any questions you might have.',
    colors: {
      bg: "bg-[#FEE6BA]",
      iconBg: "bg-[#FFF7E8]",
      iconText: "text-[#E19C17]",
      titleText: "text-[#E19C17]",
    },
  },
]);

// Standard on-scroll animation logic
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
  <section ref="sectionRef" class="info__banners py-16 lg:py-20 bg-white">
    <div class="container mx-auto px-4">
      <!-- Responsive grid for the cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <!-- Loop through the card data -->
        <div
          v-for="(card, index) in infoCards"
          :key="card.id"
          class="info-card transition-all duration-500 ease-in-out p-4"
          :class="[
            card.colors.bg,
            {
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-6': !isVisible,
            },
          ]"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <!-- Inner white container with a border -->
          <div
            class="inner-content bg-white w-full h-full p-6 flex items-start gap-4"
          >
            <!-- Icon with colored background -->
            <div
              class="icon-wrapper flex-shrink-0 rounded-full p-3"
              :class="card.colors.iconBg"
            >
              <component
                :is="card.icon"
                class="w-6 h-6"
                :class="card.colors.iconText"
              />
            </div>

            <!-- Text Content -->
            <div class="text-content">
              <h3
                class="text-base font-semibold"
                :class="card.colors.titleText"
              >
                {{ card.title }}
              </h3>
              <!-- Using v-html to render the link in the description -->
              <p
                v-html="card.description"
                class="text-sm text-[#3E4E5B] mt-1 leading-relaxed"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Scoped styles for fine-tuning */
.info-card {
  /* This creates the thick outer border effect by making the inner border transparent */
  border: 3px solid transparent;
}

.inner-content {
}

/* Enhances the hover transition to be very smooth */
.info-card {
  transition-property: opacity, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
