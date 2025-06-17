<script lang="ts" setup>
  import { StarIcon, TruckIcon, RefreshCwIcon, ShieldCheckIcon } from "lucide-vue-next"
</script>

<template>
  <footer id="footer" class="app__footer bg-[#100804] text-white">
    <!-- Top Section - Language & Trust Badges -->
    <div class="footer__top py-4 border-b border-white/10">
      <div class="container mx-auto px-4">
        <!-- MODIFIED: This now stacks on mobile and becomes a row on tablets (md:) and up -->
        <div class="flex flex-col md:flex-row md:justify-between items-center gap-y-4 md:gap-x-6">
          <Language />
          <!-- This wrapper allows badges to wrap to a new line if the screen is very narrow -->
          <div class="flex flex-wrap justify-center items-center gap-2">
            <div class="trust__badge"><StarIcon class="h-3 w-3" /><span>Premium Quality</span></div>
            <div class="trust__badge"><TruckIcon class="h-3 w-3" /><span>Fast Delivery</span></div>
            <div class="trust__badge"><RefreshCwIcon class="h-3 w-3" /><span>Easy Exchange</span></div>
            <div class="trust__badge"><ShieldCheckIcon class="h-3 w-3" /><span>Secure Payment</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Content -->
    <div class="footer__main py-12 lg:py-16">
      <div class="container mx-auto px-4">
        <!-- 
          MODIFIED: Responsive grid using Tailwind classes.
          - Mobile (default): 1 column
          - Tablet (md:): 2 columns
          - Desktop (lg:): 4 columns
        -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          
          <!-- Column 1: Logo & Company Links -->
          <div class="footer__column">
            <div class="footer__logo mb-8"><Brand class="text-white" /></div>
            <nav class="footer__nav" aria-label="Company Information">
              <ul class="space-y-4">
                <li><NuxtLink to="/about">About Us</NuxtLink></li>
                <li><NuxtLink to="/testimonials">Testimonials</NuxtLink></li>
                <li><NuxtLink to="/blog">Our Blogs</NuxtLink></li>
                <li><NuxtLink to="/careers">Careers</NuxtLink></li>
                <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
              </ul>
            </nav>
          </div>

          <!-- Column 2: Support Links -->
          <div class="footer__column">
            <h3 class="footer-heading">Support</h3>
            <nav class="footer__nav mt-6" aria-label="Customer Support">
              <ul class="space-y-4">
                <li><NuxtLink to="/exchange-return">Exchange/Return</NuxtLink></li>
                <li><NuxtLink to="/track-order">Track Order</NuxtLink></li>
                <li><NuxtLink to="/support">Customer Support</NuxtLink></li>
                <li><NuxtLink to="/dashboard">Your Account</NuxtLink></li>
                <li><NuxtLink to="/faq">FAQ's</NuxtLink></li>
                <li><NuxtLink to="/consult">Free Consult</NuxtLink></li>
                <li><NuxtLink to="/custom_order">Custom Order</NuxtLink></li>
              </ul>
            </nav>
          </div>

          <!-- Column 3: Newsletter -->
          <div class="footer__column">
            <h3 class="footer-heading">Newsletter</h3>
            <div class="newsletter__content mt-6">
              <p class="text-gray-300 text-sm leading-relaxed">
                <span class="text-orange-400 font-medium">Sign up</span> for
                getting the latest news from Himalayan Beads, including
                exclusive online pre-launches and new collections.
              </p>
            </div>
          </div>

          <!-- Column 4: Contact Information -->
          <div class="footer__column">
            <h3 class="footer-heading">Contact Information</h3>
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
            <p class="text-gray-400 text-xs sm:text-sm">Created by <a href="#" class="hover:text-white">Pikdesigns</a></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  /* 
    This block contains ONLY your original, custom CSS. 
    It does not contain any responsive media queries because those are now handled 
    by Tailwind classes in the template. This approach is clean and error-free.
  */
  .app__footer {
    position: relative;
  }
  
  .footer__top {
    border-bottom: 1px solid #30190d;
  }

  .trust__badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: #eab308;
    color: #000000;
    padding: 0.375rem 0.75rem;
    border-radius: 0.125rem; /* Using a class like `rounded-sm` is cleaner */
    font-size: 0.75rem;
    font-weight: 500; /* `font-medium` */
    transition: all 0.2s ease;
  }
  
  .trust__badge:hover {
    background-color: #d97706;
    transform: translateY(-1px);
  }

  .footer__logo {
    line-height: 1.2;
  }

  /* Shared heading style */
  .footer-heading {
    color: white;
    font-weight: 600; /* font-semibold */
    margin-bottom: 1.5rem; /* mb-6 */
    text-transform: uppercase;
    letter-spacing: 0.05em; /* tracking-wide */
    font-size: 0.875rem; /* text-sm */
  }

  .footer__nav a {
    color: #d1d5db; /* text-gray-300 */
    font-size: 0.875rem; /* text-sm */
    transition: color 0.2s ease-in-out;
  }

  .footer__nav a:hover {
    color: #fb923c; /* text-orange-400 */
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