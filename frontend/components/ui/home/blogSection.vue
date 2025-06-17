<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { navigateTo } from "#app"; // Import navigateTo from '#app'

// Animation states
const isVisible = ref(false);
const sectionRef = ref<HTMLElement>();

// Blog posts data
const blogPosts = [
  {
    id: 1,
    image: "/images/img03.png",
    category: "Category",
    timeAgo: "5 min ago",
    title: "Unveiling the Power of Rudraksha Beads",
    description: "Discover the incredible benefits of wearing Rudraksha beads.",
    slug: "unveiling-power-rudraksha-beads",
  },
  {
    id: 2,
    image: "/images/img04.png",
    category: "Category",
    timeAgo: "5 min ago",
    title: "Unveiling the Power of Rudraksha Beads",
    description: "Discover the incredible benefits of wearing Rudraksha beads.",
    slug: "unveiling-power-rudraksha-beads-2",
  },
  {
    id: 3,
    image: "/images/img03.png",
    category: "Category",
    timeAgo: "5 min ago",
    title: "Unveiling the Power of Rudraksha Beads",
    description: "Discover the incredible benefits of wearing Rudraksha beads.",
    slug: "unveiling-power-rudraksha-beads-3",
  },
];

const navigateToPost = (slug: string) => {
  // Navigate to blog post
  navigateTo(`/blog/${slug}`);
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
  <section ref="sectionRef" class="blog__posts__section py-16 lg:py-20">
    <div class="container mx-auto px-4">
      <!-- Section Title -->
      <div
        class="text-center mb-12 transition-all duration-800 ease-out"
        :class="{
          'opacity-100 translate-y-0': isVisible,
          'opacity-0 translate-y-6': !isVisible,
        }"
      >
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800">
          Explore Our Informative And Engaging Blog Posts
        </h2>
      </div>

      <!-- Blog Posts Grid -->
      <div
        class="blog__posts__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container"
      >
        <article
          v-for="(post, index) in blogPosts"
          :key="post.id"
          class="blog__post__card rounded-lg transition-all duration-500 ease-out group overflow-hidden cursor-pointer"
          :class="{
            'opacity-100 translate-y-0': isVisible,
            'opacity-0 translate-y-8': !isVisible,
          }"
          :style="{
            transitionDelay: `${index * 150}ms`,
          }"
          @click="navigateToPost(post.slug)"
        >
          <!-- Blog Post Image -->
          <div class="blog__image relative overflow-hidden">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <!-- Image Overlay on Hover -->
            <div
              class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>

          <!-- Blog Post Content -->
          <div class="blog__content p-6 relative">
            <!-- Category and Time -->
            <div class="blog__meta flex items-center gap-2 mb-3">
              <span
                class="text-sm bg-[#F6EEEA] py-2 px-3 rounded-sm text-[#3E4E5B] font-medium"
                >{{ post.category }}</span
              >
              <span class="text-gray-300">•</span>
              <span class="text-sm text-gray-500">{{ post.timeAgo }}</span>
            </div>

            <!-- Blog Title -->
            <h3
              class="blog__title text-lg lg:text-xl font-semibold text-gray-800 mb-3 leading-tight group-hover:text-[#804224] transition-colors duration-300"
            >
              {{ post.title }}
            </h3>

            <!-- Blog Description -->
            <p
              class="blog__description text-gray-600 text-sm lg:text-base leading-relaxed mb-4"
            >
              {{ post.description }}
            </p>

            <!-- Read More Button - Shows on Hover -->
            <div class="read__more__container relative h-10"> 
              <div
                class="read__more__button absolute inset-0 flex items-center"
              > 
                <button
                  class="read__more__btn opacity-0 bg-white font-bold border border-[#804224] hover:bg-[#804224] hover:text-white text-[#804224] px-4 py-2 rounded text-xs font-medium transition-colors duration-300 flex items-center gap-1 transform hover:scale-105"
                  @click.stop="navigateToPost(post.slug)"
                >
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
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

/* Staggered animation for read more button */
.group:hover .read__more__btn {
  /* Use the new fadeIn animation */
  animation: fadeIn 0.4s ease-out forwards;
  animation-delay: 0.1s;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

/* MODIFIED: This animation only handles opacity for a pure fade effect */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive adjustments */
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

/* Animation improvements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Focus states for accessibility */
.blog__post__card:focus,
.read__more__btn:focus {
  outline: 2px solid #804224;
  outline-offset: 2px;
}

/* Ensure smooth image scaling */
.blog__image img {
  will-change: transform;
}
</style>
