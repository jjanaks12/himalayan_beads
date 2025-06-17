<script lang="ts" setup>
import { ref } from "vue";
import { ArrowDownIcon } from "lucide-vue-next";
import { useIntersectionObserver } from "@vueuse/core";

// --- NEW: Accordion Logic ---
// We will now only store the ID of the single, currently open FAQ.
// We initialize it to 1, so the first FAQ starts open by default.
const openFaqId = ref<number | null>(1);

// This new function handles the core accordion logic.
const toggleFaq = (faqId: number) => {
  // If the clicked FAQ is already open, close it (by setting the open ID to null).
  // Otherwise, set the open ID to the one that was just clicked.
  openFaqId.value = openFaqId.value === faqId ? null : faqId;
};

// --- Animation Logic (using @vueuse/core) ---
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

useIntersectionObserver(
  sectionRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true;
    }
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

// --- FAQ Data (Now without the 'isOpen' property) ---
const faqs = [
  {
    id: 1,
    question: "What Is Rudraksha Used For?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
  {
    id: 2,
    question: "Who Should Wear Rudraksha?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
  {
    id: 3,
    question: "How To Check Whether Rudraksha Is Original?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
  {
    id: 4,
    question: "Why Is Nepali Rudraksha So Expensive?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
  {
    id: 5,
    question: "What Are The Qualities Of Real Rudraksha?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
  {
    id: 6,
    question: "Still Have Your Questions?",
    answer:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Sed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo. Lorem Ipsum Dolor Sit Amet Ed Risus Vitae Dui Quisque Dolor Neque Morbi Commodo.",
  },
];
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
              class="faq__item border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
              :class="{
                'opacity-100 translate-y-0': isVisible,
                'opacity-0 translate-y-4': !isVisible,
              }"
              :style="{ transitionDelay: `${index * 80}ms` }"
            >
              <!--
                MODIFICATION: The classes and styles are now bound to `openFaqId === faq.id`.
                This expression is true only for the single currently active FAQ.
              -->
              <button
                @click="toggleFaq(faq.id)"
                class="faq__question w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-300 group focus:outline-none"
                :class="{ 'bg-gray-50': openFaqId === faq.id }"
              >
                <strong
                  class="pr-4 font-semibold transition-colors duration-300 text-sm lg:text-base"
                  :class="{
                    'text-[#A0522D]': openFaqId === faq.id,
                    'text-gray-700 group-hover:text-gray-900':
                      openFaqId !== faq.id,
                  }"
                >
                  {{ faq.question }}
                </strong>
                <ArrowDownIcon
                  class="h-4 w-4 transition-transform duration-500 ease-out flex-shrink-0"
                  :class="{
                    'rotate-179 text-[#A0522D]': openFaqId === faq.id,
                    'text-gray-400 group-hover:text-gray-600':
                      openFaqId !== faq.id,
                  }"
                />
              </button>
              <div
                class="faq__answer__wrapper overflow-hidden transition-all duration-500 ease-out"
                :style="{
                  maxHeight: openFaqId === faq.id ? '200px' : '0px',
                  opacity: openFaqId === faq.id ? 1 : 0,
                }"
              >
                <div class="faq__answer px-6 pb-5 pt-1">
                  <p class="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {{ faq.answer }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Single Reviews Image (Unchanged) -->
        <div
          class="reviews__column transition-all duration-800 ease-out"
          :class="{
            'opacity-100 translate-x-0': isVisible,
            'opacity-0 translate-x-8': !isVisible,
          }"
          style="transition-delay: 200ms"
        >
          <div class="reviews__image__container">
            <img
              src="/images/review.png"
              alt="Customer Reviews"
              class="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No changes are needed to your style block. */
/* ... All your existing styles ... */
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
  border-radius: 0.5rem;
  overflow: hidden;
}
.reviews__image__container::before {
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
.reviews__image__container:hover::before {
  left: 100%;
}
.faq__item:hover .faq__question {
  background-color: #f9fafb;
}
.rotate-180 {
  transform: rotate(180deg);
}
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
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.faq__question:focus-visible {
  outline: 2px solid #a0522d;
  outline-offset: -2px;
}
.faq__answer__wrapper {
  will-change: max-height, opacity;
}
</style>
