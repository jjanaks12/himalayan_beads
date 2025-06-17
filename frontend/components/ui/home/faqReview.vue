<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ArrowDownIcon } from "lucide-vue-next";

// Animation states
const isVisible = ref(false);
const sectionRef = ref<HTMLElement>();

// FAQ data with reactive open/close states
const faqs = ref([
  {
    id: 1,
    question: "What Is Rudraksha Used For?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: false,
  },
  {
    id: 2,
    question: "Who Should Wear Rudraksha?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: true,
  },
  {
    id: 3,
    question: "How To Check Whether Rudraksha Is Original?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: false,
  },
  {
    id: 4,
    question: "Why Is Nepali Rudraksha So Expensive?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: false,
  },
  {
    id: 5,
    question: "What Are The Qualities Of Real Rudraksha?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: false,
  },
  {
    id: 6,
    question: "Still Have Your Questions?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
    isOpen: false,
  },
]);

// Toggle FAQ function with smooth animations
const toggleFaq = (faqId: number) => {
  const faq = faqs.value.find((f) => f.id === faqId);
  if (faq) {
    faq.isOpen = !faq.isOpen;
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
  <section
    ref="sectionRef"
    class="faq__reviews__section py-16 lg:py-20 bg-white"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Left Column - FAQ Accordion -->
        <div
          class="faq__column transition-all duration-800 ease-out"
          :class="{
            'opacity-100 translate-x-0': isVisible,
            'opacity-0 -translate-x-8': !isVisible,
          }"
        >
          <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
            Mostly Customer Ask FAQ's
          </h2>

          <div class="faq__accordion space-y-3">
            <div
              v-for="(faq, index) in faqs"
              :key="faq.id"
              class="faq__item border border-gray-200 overflow-hidden transition-all duration-300"
              :class="{
                'bg-white  border border-gray-200': faq.isOpen,
                'opacity-100 translate-y-0': isVisible,
                'opacity-0 translate-y-4': !isVisible,
              }"
              :style="{ transitionDelay: `${index * 80}ms` }"
            >
              <!-- FAQ Question Header - Clickable -->
              <!-- MODIFIED: Removed focus:ring-* classes from here -->
              <button
                @click="toggleFaq(faq.id)"
                class="faq__question w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-300 group focus:outline-none"
                :class="{
                  'text-[#A0522D] font-medium': faq.isOpen,
                  'text-gray-700 hover:text-gray-900': !faq.isOpen,
                }"
              >
                <span
                  class="pr-4 transition-all font-semibold duration-300 text-sm lg:text-base"
                  :class="{
                    'text-[#A0522D] font-semibold': faq.isOpen,
                    'text-gray-700 group-hover:text-gray-900': !faq.isOpen,
                  }"
                >
                  {{ faq.question }}
                </span>

                <!-- Arrow Down Icon with Rotation Animation -->
                <ArrowDownIcon
                  class="h-4 w-4 transition-all duration-500 ease-out flex-shrink-0"
                  :class="{
                    'rotate-179 text-[#A0522D]': faq.isOpen,
                    '  text-gray-400 group-hover:text-gray-600': !faq.isOpen,
                  }"
                />
              </button>

              <!-- FAQ Answer Content with Smooth Slide Animation -->
              <div
                class="faq__answer__wrapper overflow-hidden transition-all duration-500 ease-out"
                :style="{
                  maxHeight: faq.isOpen ? '200px' : '0px',
                  opacity: faq.isOpen ? '1' : '0',
                }"
              >
                <div class="faq__answer px-6 pb-5 pt-1">
                  <div
                    class="transition-all duration-300 delay-100"
                    :class="{
                      'transform translate-y-0 opacity-100': faq.isOpen,
                      'transform -translate-y-2 opacity-0': !faq.isOpen,
                    }"
                  >
                    <p
                      class="text-gray-600 leading-relaxed text-sm lg:text-base"
                    >
                      {{ faq.answer }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Single Reviews Image -->
        <div
          class="reviews__column transition-all duration-800 ease-out"
          :class="{
            'opacity-100 translate-x-0': isVisible,
            'opacity-0 translate-x-8': !isVisible,
          }"
          style="transition-delay: 200ms"
        >
          <!-- Single Reviews Image -->
          <div class="reviews__image__container">
            <img
              src="/images/review.png"
              alt="Customer Reviews and Trustpilot Rating"
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!-- Your style block remains the same and is perfect -->
<style scoped>
.faq__reviews__section {
  position: relative;
}

.faq__item {
  cursor: pointer;
}

.faq__question {
  border: none;
  outline: none;
  cursor: pointer;
}

.faq__question:focus {
  outline: none;
}

.faq__answer__wrapper {
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease-out;
}

.reviews__image__container {
  position: relative;
  background: #f8f9fa;
}

.reviews__image__container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 1;
  pointer-events: none;
}

.reviews__image__container:hover::before {
  opacity: 1;
}

/* Enhanced hover effects for FAQ items */
.faq__item:hover {
  transform: translateY(-1px);
}

/* Smooth rotation for arrow */
.rotate-180 {
  transform: rotate(180deg);
}

/* Active FAQ styling */
.faq__item.bg-white {
  /* box-shadow: 0 2px 8px rgba(128, 66, 36, 0.08); */
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .faq__reviews__section {
    padding: 3rem 0;
  }
}

@media (max-width: 640px) {
  .faq__question {
    padding: 1rem 1.25rem;
  }

  .faq__answer {
    padding: 0 1.25rem 1.25rem;
  }

  .reviews__image__container {
    margin-top: 2rem;
  }
}

/* Animation improvements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
.faq__question:focus-visible {
  outline: 2px solid #a0522d;
  outline-offset: -2px;
}

/* Ensure smooth height transitions */
.faq__answer__wrapper {
  will-change: max-height, opacity;
}
</style>
