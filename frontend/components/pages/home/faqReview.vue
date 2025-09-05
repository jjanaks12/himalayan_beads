<script lang="ts" setup>
  import { ArrowDownIcon } from "lucide-vue-next"

  const openFaqId = ref<number | null>(0)

  const toggleFaq = (index: number) => {
    openFaqId.value = openFaqId.value === index ? null : index
  }

  const sectionRef = ref<HTMLElement | null>(null)
  const { isVisible } = useViewport(sectionRef)

  const faqs = [{
    question: "Why Himalayan Beads?",
    answer: "Himalayan Beads is built on a family legacy of trust, authenticity, and deep spiritual values. With over 15 years of experience sourcing Rudraksha from Nepal’s renowned Sankhuwasabha region, we offer only premium, original Rudraksha beads—energized and certified. Our mission is to make genuine, spiritually powerful Rudraksha available globally at affordable prices.",
  }, {
    question: "Does Himalayan Beads Provide Certificate of Authenticity?",
    answer: "Yes. Every Rudraksha bead we sell is lab-tested and comes with a <strong>Certificate of Authenticity</strong>, ensuring it is 100% natural, unaltered, and sourced from Nepal. We stand behind the purity and power of every product.",
  }, {
    question: "What payment methods do you accept at Himalayan Beads?",
    answer: "We accept a wide range of payment methods for your convenience, including major credit and debit cards, digital wallets, bank transfers, and secure local options depending on your country. All transactions are processed securely.",
  }, {
    question: "Are payments secure on Himalayan Beads?",
    answer: "Absolutely. We use encrypted payment gateways and secure checkout systems to protect your personal and financial information. Your privacy and security are our top priorities.",
  }, {
    question: "How can I identify genuine Nepali Rudraksha?",
    answer: "Genuine Nepali Rudraksha beads have deep, clear mukhis (lines), a natural hole, and are rough-textured. They are not artificially colored or machine-polished. We ensure authenticity by sourcing directly from Sankhuwasabha, the heart of Nepal’s Rudraksha trade, and verifying each bead through lab testing.",
  }, {
    question: "Who should wear Rudraksha?",
    answer: "Rudraksha beads are ideal for anyone seeking spiritual growth, healing, and inner peace—regardless of faith or background. They benefit students, professionals, meditators, and those experiencing stress or life transitions.",
  }, {
    question: "How much does shipping cost at Himalayan Beads?",
    answer: "We offer <strong>fast and affordable worldwide shipping</strong>. Shipping charges may vary based on your location and order weight, but we regularly run free shipping promotions. All orders are securely packed and tracked.",
  }, {
    question: "How much does shipping cost at Himalayan Beads?",
    answer: "We offer <strong>fast and affordable worldwide shipping</strong>. Shipping charges may vary based on your location and order weight, but we regularly run free shipping promotions. All orders are securely packed and tracked.",
  },
  {
    question: "What types of Rudraksha beads does Himalayan Beads offer?",
    answer: "We offer a wide variety of Mukhi Rudraksha beads (from 1 Mukhi to 21 Mukhi), rare varieties, Rudraksha malas, custom bead combinations, and energized spiritual sets. Each bead is carefully selected, blessed, and made available with proper guidance for use."
  },
  {
    question: "What is Rudraksha used for?",
    answer: "Rudraksha beads are sacred spiritual tools known for their healing properties and energy-balancing benefits. Traditionally worn for meditation, protection, and mental clarity, Rudraksha helps reduce stress, promote inner peace, and support spiritual growth. They're often used by spiritual practitioners, yogis, and anyone seeking a deeper connection to themselves."
  },
  {
    question: "Who should wear Rudraksha?",
    answer: "Anyone seeking peace, focus, health, and spiritual empowerment can wear Rudraksha—regardless of religion or background. Whether you're a student, professional, spiritual seeker, or someone navigating life’s challenges, Rudraksha can provide clarity, strength, and energetic balance."
  },
  {
    question: "How to check whether Rudraksha is original?",
    answer: "Authentic Rudraksha has clear, well-defined mukhis (faces or lines), a natural hole, and a firm texture. Unlike imitations, genuine beads do not float in water and are not artificially polished. All beads from Himalayan Beads are handpicked, lab-verified, and ethically sourced from Nepal’s Sankhuwasabha }district—renowned for the highest quality Rudraksha."
  },
  {
    question: "Why is Nepali Rudraksha so expensive?",
    answer: "Nepali Rudraksha is globally valued for its size, clarity, and spiritual potency. Unlike machine-polished or artificially modified alternatives, our beads are naturally grown, manually sorted, and ritually energized. The limited growing regions and traditional harvesting methods contribute to their premium }quality and price."
  },
  {
    question: "What are the qualities of real Rudraksha?",
    answer: "Real Rudraksha has symmetrical lines (mukhis), a naturally formed central hole, a textured surface, and is free from artificial coatings. Authentic Rudraksha is durable, energizing, and resonates with a calming energy when worn. At Himalayan Beads, we provide energized, lab-tested beads with a certificate of }authenticity."
  },
  {
    question: "Still have your questions?",
    answer: "We’re here to help. Visit our Contact us page or email us at info@himalayanbeads.com for personal guidance. You can also explore our blog and consultation services for deeper insights."
  }]
</script>

<template>
  <section ref="sectionRef" class="relative py-16 lg:py-20 bg-white">
    <div class="container mx-auto px-4">
      <div class="transition-all duration-800 ease-out" :class="{
        'opacity-100 translate-x-0': isVisible,
        'opacity-0 -translate-x-8': !isVisible,
      }">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-8"> Mostly Customer Ask FAQ's</h2>
        <div class="faq__accordion grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div v-for="(faq, index) in faqs" :key="index"
            class="faq__item border border-gray-200 rounded-lg overflow-hidden transition-all duration-300" :class="{
              'opacity-100 translate-y-0': isVisible,
              'opacity-0 translate-y-4': !isVisible,
            }" :style="{ transitionDelay: `${index * 80}ms` }">
            <button @click="toggleFaq(index)"
              class="faq__question w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-300 group focus:outline-none"
              :class="{ 'bg-gray-50': openFaqId === index }">
              <strong class="pr-4 font-semibold transition-colors duration-300 text-sm lg:text-base" :class="{
                'text-[#A0522D]': openFaqId === index,
                'text-gray-700 group-hover:text-gray-900':
                  openFaqId !== index,
              }">
                {{ faq.question }}
              </strong>
              <ArrowDownIcon class="h-4 w-4 transition-transform duration-500 ease-out flex-shrink-0" :class="{
                'rotate-179 text-[#A0522D]': openFaqId === index,
                'text-gray-400 group-hover:text-gray-600':
                  openFaqId !== index,
              }" />
            </button>
            <div class="faq__answer__wrapper overflow-hidden transition-all duration-500 ease-out" :style="{
              maxHeight: openFaqId === index ? '200px' : '0px',
              opacity: openFaqId === index ? 1 : 0,
            }">
              <div class="faq__answer px-6 pb-5 pt-1">
                <p class="text-gray-600 leading-relaxed text-sm lg:text-base" v-html="faq.answer" />
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="reviews__column transition-all duration-800 ease-out" :class="{
          'opacity-100 translate-x-0': isVisible,
          'opacity-0 translate-x-8': !isVisible,
        }" style="transition-delay: 200ms">
          <div class="reviews__image__container">
            <img src="/images/review.png" alt="Customer Reviews" class="w-full h-auto object-cover rounded-lg"
              loading="lazy" />
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

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
    background: linear-gradient(90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent);
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
