<script setup lang="ts">
    import * as Icons from 'lucide-vue-next'

    interface IconProps {
        name: keyof typeof Icons
        size?: number
        color?: string
        strokeWidth?: number
        defaultClass?: String
    }

    const props = defineProps<IconProps>()

    const icon = computed(() => Icons[props.name])
</script>

<template>
    <!-- @vue-ignore -->
    <component :is="icon" :size="size" :color="color" :stroke-width="strokeWidth" :default-class="defaultClass" />
</template>
