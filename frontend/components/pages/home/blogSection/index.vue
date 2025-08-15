<script lang="ts" setup>
  import { useBlogStore } from '~/store/blogStore'
  import BlogItem from './item.vue'

  const sectionRef = ref<HTMLElement | null>(null)
  const { isVisible } = useViewport(sectionRef)
  const { blogs } = storeToRefs(useBlogStore())
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

      <div class="blog__posts__grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" v-if="sectionRef">
        <BlogItem v-for="(post, index) in blogs" :key="post.id" :post="post" :index="index" :class="{
          'opacity-100 translate-y-0': isVisible,
          'opacity-0 translate-y-8': !isVisible
        }" />
      </div>
    </div>
  </section>
</template>