<script lang="ts" setup>
    useHead({
        title: "Himalayan Beads Consultation Service",
        meta: [
            {
                name: "description",
                content:
                    "Discover the beauty of Himalayan Beads. Experience the spiritual benefits of our authentic rudraksha products.",
            },
        ],
    })

    definePageMeta({
        layout: "default",
        auth: false,
    })

    const sectionRef = ref<HTMLElement | null>(null)
    const { isVisible } = useViewport(sectionRef)
    const text = `<p>Book a Consultation – Your Spiritual Journey Begins Here <br/>At Himalayan Beads, we understand that every individual’s spiritual path is unique. Whether you're seeking clarity, healing, success, or inner peace, our experienced spiritual guides are here to assist you. Book a consultation to receive personalized advice on selecting the right Rudraksha, gemstones, or spiritual products based on your needs and energies. We offer both free guidance and in-depth paid consultations for those who desire deeper insights. Let us help you unlock the true power of these sacred Himalayan treasures and take the next meaningful step in your spiritual journey.</p>`
</script>

<template>
    <div class="bg-secondary text-white text-center transition-all duration-800 ease-out py-4 lg:py-14"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
        <h1 class="text-2xl lg:text-3xl font-bold">Himalayan Beads Consultation Service</h1>
    </div>
    <div ref="sectionRef" class="container">
        <div class="text__holder py-12" v-html="text" />
    </div>
</template>