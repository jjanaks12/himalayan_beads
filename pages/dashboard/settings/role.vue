<script setup lang="ts">
    useHead({
        title: 'Roles :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const showForm = ref(false)
</script>

<template>

    <section class="datatable__section">
        <header class="datatable__header">
            <div class="datatable__header__holder">
                <h1>Roles</h1>
            </div>
            <div class="datatable__header__action">
                <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
                    <span class="prepend-icon icon-add"></span>
                    Add Roles
                </a>
            </div>
        </header>
        <div class="datatable__body">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class="text--left">Name</th>
                        <th>Created at</th>
                        <th class="text--right">Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </section>
</template>