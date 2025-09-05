<script lang="ts" setup>
    useHead({
        title: 'About'
    })

    definePageMeta({
        layout: 'default',
        auth: false
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const { isVisible } = useViewport(sectionRef)
    const text = `<p>Growing up in a spiritual environment, we developed a deep appreciation for the undeniable value of Rudraksha beads. Over time, the global recognition of these sacred beads has steadily increased. Our journey began with our grandfather, who started buying and selling Rudraksha in small quantities to provide for his family and ensure a good education for us, his children. We proudly continue his legacy.</p>
    <p>For the past 15 years, we have been running our business in Sankhuwasabha, the Rudraksha market hub of Nepal. The quality of Rudraksha from this region is renowned and proven to be top-notch. Initially, our focus was on exporting Rudraksha to China and India.</p>
    <p>However, with the growing global demand, we have now launched an e-commerce platform as Himalayan Beads Pvt. Ltd. This allows us to share authentic knowledge about the profound benefits of Rudraksha and make our pure, genuine, premium-quality beads accessible to anyone, anywhere in the world.</p>
    <h2>Mission and Vision:</h2>
    <ul>
    <li>To promote authentic local products such as Rudraksha, black cardamom, coffee, gemstones, and ritual and spiritual accessories to a global audience.</li>
    <li>To educate people about the profound benefits of Rudraksha beads and gemstones, which encompass powerful healing properties, pathways to success, and avenues for self-empowerment.</li>
    <li>To offering top-quality Rudraksha, gemstones, and spiritual products, along with comprehensive usage guidelines, at affordable prices.</li>
    <li>To make genuine Nepalese Rudraksha accessible to everyone by providing them at affordable prices.</li>
    <li>To establish ourselves as the premier global destination for authentic Nepali Rudraksha, recognized for our extensive and genuine collection.</li>
</ul>`
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
        <h1 class="text-2xl lg:text-3xl font-bold">About us</h1>
    </div>
    <div ref="sectionRef" class="container">
        <div class="text__holder py-12" v-html="text" />
    </div>
</template>