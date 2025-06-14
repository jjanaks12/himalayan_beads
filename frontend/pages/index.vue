<script lang="ts" setup>
    useHead({
        title: 'Home page'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })
</script>

<template>
    <section class="main__banner">
        <div class="main__banner__bg">
            <img src="/images/img01.png" alt="image description">
        </div>
        <div class="main__banner__caption">
            <div class="container">
                <div class="holder">
                    <h1>Discover the beauty of Himalayan Beads.</h1>
                    <p>Experience the spiritual benefits of our authentic rudraksha products.</p>
                    <div class="btn__group">
                        <NuxtLink :to="{ name: 'product' }" class="btn btn__primary">explore all products</NuxtLink>
                        <a href="#" class="btn btn__light">learn more</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>