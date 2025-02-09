<script setup lang="ts">
    useHead({
        title: 'Dashboard :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth', 'authorization'],
        permission: '*'
    })

    const dashboardDetails = ref()

    onMounted(() => {
        $fetch('/api/dashboard')
            .then(dashboardResponse => {
                dashboardDetails.value = dashboardResponse.data
            })
    })
</script>

<template>
    <section class="content__section">
        <header class="content__header sr-only">
            <div class="content__header__holder">
                <h1>Dashboard</h1>
            </div>
        </header>
        <div class="content__body">
            <section class="card">
                <header class="card__header">
                    <h2 class="card__title">Products</h2>
                </header>
                <main class="card__body">
                    <dl class="card__stats">
                        <template v-for="(value, key) in dashboardDetails">
                            <dt>{{ key }}:</dt>
                            <dd>{{ value }}</dd>
                        </template>
                    </dl>
                </main>
            </section>
        </div>
    </section>
</template>