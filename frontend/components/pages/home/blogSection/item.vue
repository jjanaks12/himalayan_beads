<script lang="ts" setup>
    import type { Blog } from '~/himalayan_beads'
    import { showImage, timeAgo } from '~/lib/filters'

    interface BlogItemProps {
        post: Blog
        index: number
    }

    const props = defineProps<BlogItemProps>()
</script>

<template>
    <article class="h-full flex flex-col rounded-lg transition-all duration-500 ease-out group overflow-hidden"
        :style="{ transitionDelay: `${index * 150}ms` }">
        <figure class="blog__image relative overflow-hidden rounded-lg">
            <img :src="showImage(post.image?.name as string)" :alt="post.title" v-if="post.image_id"
                class="w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
            <div v-else
                class="bg-gray-300 w-full h-48 lg:h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
        </figure>
        <div class="blog__content p-6 relative flex-grow flex flex-col justify-between">
            <div>
                <div class="blog__meta flex items-center gap-2 mb-3">
                    <Badge variant="outline">
                        <NuxtLink :to="{ name: 'category', query: { slug: post.category?.slug } }">
                            {{ post.category.name }}
                        </NuxtLink>
                    </Badge>
                    <span class="text-gray-300">•</span>
                    <span class="text-sm text-gray-500">{{ timeAgo(post.publishedAt as string) }}</span>
                </div>
                <h3
                    class="blog__title text-lg lg:text-xl font-semibold text-gray-800 mb-3 leading-tight group-hover:text-[#804224] transition-colors duration-300">
                    <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
                </h3>
                <p class="blog__description text-gray-600 text-sm lg:text-base leading-relaxed mb-4">
                    {{ post.excerpt }}
                </p>
            </div>

            <div class="read__more__container relative h-10 mt-auto">
                <div class="read__more__button absolute inset-0 flex items-center">
                    <Button variant="secondary" @click="navigateTo(`/blog/${post.slug}`)">
                        READ MORE
                    </Button>
                </div>
            </div>
        </div>
    </article>
</template>