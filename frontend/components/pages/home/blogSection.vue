<script lang="ts" setup>
  import { ref } from "vue";
  import { useIntersectionObserver } from "@vueuse/core";
  // Import the new type from your central definition file
  import type { BlogPost } from "~/himalayan_beads";

  // --- Animation Logic (using @vueuse/core) ---
  const isVisible = ref(false);
  const sectionRef = ref<HTMLElement | null>(null);

  useIntersectionObserver(
    sectionRef,
    ([{ isIntersecting }]) => {
      if (isIntersecting) { isVisible.value = true; }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // --- MODIFIED: The blogPosts array is now strongly typed ---
  const blogPosts: BlogPost[] = [
    { id: 1, image: "/images/img03.png", category: "Category", timeAgo: "5 min ago", title: "Unveiling the Power of Rudraksha Beads", description: "Discover the incredible benefits of wearing Rudraksha beads.", slug: "unveiling-power-rudraksha-beads", },
    { id: 2, image: "/images/img04.png", category: "Category", timeAgo: "5 min ago", title: "Unveiling the Power of Rudraksha Beads", description: "Discover the incredible benefits of wearing Rudraksha beads.", slug: "unveiling-power-rudraksha-beads-2", },
    { id: 3, image: "/images/img03.png", category: "Category", timeAgo: "5 min ago", title: "Unveiling the Power of Rudraksha Beads", description: "Discover the incredible benefits of wearing Rudraksha beads.", slug: "unveiling-power-rudraksha-beads-3", },
  ];

  // The navigateToPost function is no longer needed as we use <NuxtLink> directly.
</script>

<template>
  <section ref="sectionRef" class="blog__posts__section py-16 lg:py-20">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12 transition-all duration-800 ease-out"
        :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-6': !isVisible }">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800">
          Explore Our Informative And Engaging Blog Posts
        </h2>
      </div>

      <div class="blog__posts__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 
          MODIFIED:
          - The <article> is now wrapped in a <NuxtLink> for proper navigation.
          - All styling classes, including 'group', have been moved to the <NuxtLink>.
        -->
        <NuxtLink v-for="(post, index) in blogPosts" :key="post.id" :to="`/blog/${post.slug}`"
          class="blog__post__card rounded-lg transition-all duration-500 ease-out group overflow-hidden block" :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-8': !isVisible,
          }" :style="{ transitionDelay: `${index * 150}ms` }">
          <article class="h-full flex flex-col">
            <!-- MODIFIED: Using <figure> for better image semantics -->
            <figure class="blog__image relative overflow-hidden">
              <img :src="post.image" :alt="post.title"
                class="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div
                class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </figure>

            <!-- 
              MODIFIED: Using flexbox to push the "Read More" button to the bottom,
              ensuring a consistent layout regardless of content length.
            -->
            <div class="blog__content p-6 relative flex-grow flex flex-col justify-between">
              <div>
                <div class="blog__meta flex items-center gap-2 mb-3">
                  <span class="text-sm bg-[#F6EEEA] py-2 px-3 rounded-sm text-[#3E4E5B] font-medium">{{ post.category
                    }}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-sm text-gray-500">{{ post.timeAgo }}</span>
                </div>
                <h3
                  class="blog__title text-lg lg:text-xl font-semibold text-gray-800 mb-3 leading-tight group-hover:text-[#804224] transition-colors duration-300">
                  {{ post.title }}
                </h3>
                <p class="blog__description text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                  {{ post.description }}
                </p>
              </div>

              <!-- MODIFIED: "Read More" is now a styled <span>, as the whole card is the link -->
              <div class="read__more__container relative h-10 mt-auto">
                <div class="read__more__button absolute inset-0 flex items-center">
                  <span
                    class="read__more__btn opacity-0 bg-white border border-[#804224] group-hover:bg-[#804224] group-hover:text-white text-[#804224] px-4 py-2 rounded text-xs font-medium transition-all duration-300 flex items-center gap-1">
                    READ MORE
                  </span>
                </div>
              </div>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>

  /* 
  Your original styles are preserved exactly to maintain the visual design.
  No changes were made here.
*/
  .blog__posts__section {
    position: relative;
  }

  .blog__post__card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .blog__image {
    position: relative;
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  }

  .blog__content {
    position: relative;
  }

  .read__more__container {
    position: relative;
    min-height: 2.5rem;
  }

  .read__more__button {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .group:hover .blog__description {
    color: #4b5563;
  }

  .group:hover .read__more__btn {
    animation: fadeIn 0.4s ease-out forwards;
    animation-delay: 0.1s;
    transition: 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .blog__posts__grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .blog__content {
      padding: 1.25rem;
    }

    .blog__image img {
      height: 12rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    .blog__posts__grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .blog__image img {
    will-change: transform;
  }
</style>