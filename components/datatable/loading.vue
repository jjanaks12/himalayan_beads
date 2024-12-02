<script setup lang="ts">
    interface LoadingProps {
        row: number
        column: number
    }

    const props = defineProps<LoadingProps>()
</script>

<template>
    <tr class="datatable__loading" v-for="index in row" :style="`--delay: ${index * .1}s`">
        <td v-for="_ in column"></td>
    </tr>
</template>