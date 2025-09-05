<script lang="ts" setup>
  import { StarIcon, TruckIcon, RefreshCwIcon, ShieldCheckIcon } from "lucide-vue-next"
  import { useAuthStore } from "~/store/auth"

  const { isLoggedin } = storeToRefs(useAuthStore())
</script>

<template>
  <footer id="footer" class="relative bg-[#100804] text-white">
    <div class="footer__top py-4 border-b border-[#30190d]">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row md:justify-between items-center gap-y-4 md:gap-x-6">
          <!-- <Language /> -->
          <div class="flex flex-wrap justify-center items-center gap-2 ml-auto">
            <div
              class="bg-[#eab308] text-black flex items-center gap-0.5 px-3 py-2.5 rounded-sm text-xs font-medium transition-all hover:bg-[#d97706] hover:-translate-y-0.5">
              <StarIcon :size="12" /><span>Premium Quality</span>
            </div>
            <div
              class="bg-[#eab308] text-black flex items-center gap-0.5 px-3 py-2.5 rounded-sm text-xs font-medium transition-all hover:bg-[#d97706] hover:-translate-y-0.5">
              <TruckIcon :size="12" /><span>Fast Delivery</span>
            </div>
            <div
              class="bg-[#eab308] text-black flex items-center gap-0.5 px-3 py-2.5 rounded-sm text-xs font-medium transition-all hover:bg-[#d97706] hover:-translate-y-0.5">
              <RefreshCwIcon :size="12" /><span>Easy Exchange</span>
            </div>
            <div
              class="bg-[#eab308] text-black flex items-center gap-0.5 px-3 py-2.5 rounded-sm text-xs font-medium transition-all hover:bg-[#d97706] hover:-translate-y-0.5">
              <ShieldCheckIcon :size="12" /><span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="footer__main py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          <div class="footer__column">
            <Brand class="mb-8" />
            <nav class="footer__nav" aria-label="Company Information">
              <ul class="space-y-4">
                <li>
                  <NuxtLink to="/about">About Us</NuxtLink>
                </li>
                <!-- <li>
                  <NuxtLink to="/testimonials">Testimonials</NuxtLink>
                </li> -->
                <li>
                  <NuxtLink to="/blog">Our Blogs</NuxtLink>
                </li>
                <!-- <li>
                  <NuxtLink to="/careers">Careers</NuxtLink>
                </li> -->
                <li>
                  <NuxtLink to="/contact">Contact Us</NuxtLink>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Column 2: Support Links -->
          <div class="footer__column">
            <h3 class="font-semibold mb-6 uppercase tracking-wide text-sm">Support</h3>
            <nav class="footer__nav mt-6" aria-label="Customer Support">
              <ul class="space-y-4">
                <!-- <li>
                  <NuxtLink to="/exchange-return">Exchange/Return</NuxtLink>
                </li> -->
                <!-- <li>
                  <NuxtLink to="/track-order">Track Order</NuxtLink>
                </li> -->
                <!-- <li>
                  <NuxtLink to="/support">Customer Support</NuxtLink>
                </li> -->
                <li v-if="isLoggedin">
                  <NuxtLink to="/dashboard">Your Account</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/faq">FAQ's</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/consultation">Free Consult</NuxtLink>
                </li>
                <!-- <li>
                  <NuxtLink to="/custom_order">Custom Order</NuxtLink>
                </li> -->
              </ul>
            </nav>
          </div>

          <!-- Column 3: Newsletter -->
          <div class="footer__column">
            <h3 class="font-semibold mb-6 uppercase tracking-wide text-sm">Newsletter</h3>
            <div class="newsletter__content mt-6">
              <p class="text-gray-300 text-sm leading-relaxed">
                <NuxtLink class="text-orange-400 font-medium" to="/register">Sign up</NuxtLink> for
                getting the latest news from Himalayan Beads, including
                exclusive online pre-launches and new collections.
              </p>
            </div>
          </div>

          <!-- Column 4: Contact Information -->
          <div class="footer__column">
            <h3 class="font-semibold mb-6 uppercase tracking-wide text-sm">Contact Information</h3>
            <!-- MODIFIED: Using the semantically correct <address> tag -->
            <address class="contact__info space-y-3 mt-6 not-italic">
              <p class="text-gray-300 text-sm leading-relaxed">
                123 Himalayan Street, Kathmandu, Nepal
              </p>
              <p><a href="mailto:info@himalayanbeads.com">info@himalayanbeads.com</a></p>
              <p><a href="tel:+977123456789" class="text-gray-300">+977-123456789</a></p>
            </address>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Copyright & Payment Methods -->
    <div class="footer__bottom py-6 border-t border-white/10">
      <div class="container mx-auto px-4">
        <!-- MODIFIED: Stacks vertically on mobile, becomes a row on tablets and up -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p class="text-gray-400 text-xs sm:text-sm">©2024 Himalayan Beads Pvt. Ltd.</p>
          <div class="flex items-center gap-6">
            <div class="payment__methods flex items-center gap-3"></div>
            <p class="text-gray-400 text-xs sm:text-sm">Created by <a href="http://janakstha.com.np" target="_blank"
                class="hover:text-white">janakstha</a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer__logo {
    line-height: 1.2;
  }

  .footer__nav a {
    color: #d1d5db;
    /* text-gray-300 */
    font-size: 0.875rem;
    /* text-sm */
    transition: color 0.2s ease-in-out;
  }

  .footer__nav a:hover {
    color: #fb923c;
    /* text-orange-400 */
  }

  .contact__info a {
    color: #fb923c;
    font-size: 0.875rem;
    transition: color 0.2s ease-in-out;
  }

  .contact__info a:hover {
    color: #fdba74;
  }

  /* Focus states for accessibility */
  .footer__nav a:focus,
  .contact__info a:focus {
    outline: 2px solid #fb923c;
    outline-offset: 2px;
    border-radius: 2px;
  }
</style>