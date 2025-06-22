<script lang="ts" setup>
    import { SearchIcon } from 'lucide-vue-next'

    const searchQuery = ref("")
    const handleSearch = () => { }
</script>

<template>
    <form @submit.prevent="handleSearch" class="relative">
        <Input v-model="searchQuery" placeholder="Search..."
            class="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 rounded-2xl" />
        <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </form>
</template>