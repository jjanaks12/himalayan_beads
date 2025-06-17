<script lang="ts" setup>
  import { ref } from "vue"
  import { StarIcon, TruckIcon, RefreshCwIcon, ShieldCheckIcon } from "lucide-vue-next"
  // Newsletter signup
  const email = ref("")
</script>

<template>
  <footer id="footer" class="app__footer bg-[#100804] text-white">
    <!-- Top Section - Language & Trust Badges -->
    <div class="footer__top py-4">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <!-- Language Selector -->
          <Language />

          <!-- Trust Badges -->
          <div class="flex items-center gap-2">
            <div
              class="trust__badge flex items-center gap-1 bg-[#FBB530] text-[#100804] px-3 py-1.5 rounded text-xs font-medium">
              <StarIcon class="h-3 w-3" />
              <span>Premium Quality</span>
            </div>
            <div
              class="trust__badge flex items-center gap-1 bg-[#FBB530] text-[#100804] px-3 py-1.5 rounded text-xs font-medium">
              <TruckIcon class="h-3 w-3" />
              <span>Fast Delivery</span>
            </div>
            <div
              class="trust__badge flex items-center gap-1 bg-[#FBB530] text-[#100804] px-3 py-1.5 rounded text-xs font-medium">
              <RefreshCwIcon class="h-3 w-3" />
              <span>Easy Exchange</span>
            </div>
            <div
              class="trust__badge flex items-center gap-1 bg-[#FBB530] text-[#100804] px-3 py-1.5 rounded text-xs font-medium">
              <ShieldCheckIcon class="h-3 w-3" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="footer__main py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-4 gap-8">
          <!-- Column 1: Logo & Company Links -->
          <div class="footer__column">
            <!-- Logo -->
            <div class="footer__logo mb-8">
              <Brand class="mr-12" />
            </div>

            <!-- Company Links -->
            <nav class="footer__nav">
              <ul class="space-y-4">
                <li>
                  <NuxtLink to="/about"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">About Us
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/testimonials"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Testimonials
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/blog"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Our Blogs
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/careers"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Careers
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Contact Us
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Column 2: Support Links -->
          <div class="footer__column">
            <nav class="footer__nav">
              <ul class="space-y-4">
                <li>
                  <NuxtLink to="/exchange-return"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Exchange/Return
                    Order</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/track-order"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Track Order
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/support"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Customer Support
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/dashboard"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Your Account
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/faq"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">FAQ's</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/consult"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Free Consult
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/custom_order"
                    class="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm">Custom Order
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Column 3: Newsletter -->
          <div class="footer__column">
            <h3 class="text-white font-semibold mb-6 uppercase tracking-wide text-sm">
              Newsletter
            </h3>
            <div class="newsletter__content">
              <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                <span class="text-orange-400 font-medium">Sign up</span> for
                getting the latest news from Himalayan Beads, including
                exclusive online pre-launches and new collections.
              </p>
            </div>
          </div>

          <!-- Column 4: Contact Information -->
          <div class="footer__column">
            <h3 class="text-white font-semibold mb-6 uppercase tracking-wide text-sm">
              Contact Information
            </h3>
            <div class="contact__info space-y-3">
              <div class="contact__item">
                <p class="text-gray-300 text-sm leading-relaxed">
                  123 Himalayan Street, Kathmandu, Nepal
                </p>
              </div>
              <div class="contact__item">
                <a href="mailto:info@himalayanbeads.com"
                  class="text-orange-400 hover:text-orange-300 transition-colors duration-200 text-sm">
                  info@himalayanbeads.com
                </a>
              </div>
              <div class="contact__item">
                <p class="text-gray-300 text-sm">+977-123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Copyright & Payment Methods -->
    <div class="footer__bottom py-6">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <!-- Copyright -->
          <div class="copyright">
            <p class="text-gray-400 text-sm">©2024 Himalayan Beads Pvt. Ltd.</p>
          </div>

          <!-- Payment Methods & Credits -->
          <div class="flex items-center gap-6">
            <!-- Payment Methods -->
            <div class="payment__methods flex items-center gap-3"></div>

            <!-- Credits -->
            <div class="credits">
              <p class="text-gray-400 text-sm">Created by Pikdesigns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .app__footer {
    position: relative;
  }

  .footer__top {
    border-bottom: 1px solid #30190d;
  }

  .trust__badge {
    background-color: #eab308;
    color: #000000;
    transition: all 0.2s ease;
  }

  .trust__badge:hover {
    background-color: #d97706;
    transform: translateY(-1px);
  }

  .footer__logo {
    line-height: 1.2;
  }

  .footer__nav a:hover {
    color: #fb923c;
  }

  .newsletter__form input:focus {
    outline: 2px solid #fb923c;
    outline-offset: 2px;
  }

  .contact__info a:hover {
    color: #fdba74;
  }

  /* Grid layout for exact positioning */
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .footer__top .flex {
      flex-direction: column;
      gap: 1rem;
    }

    .trust__badge {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
    }

    .footer__bottom .flex {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }

  /* Focus states for accessibility */
  .footer__nav a:focus,
  .contact__info a:focus {
    outline: 2px solid #fb923c;
    outline-offset: 2px;
    border-radius: 2px;
  }
</style>
