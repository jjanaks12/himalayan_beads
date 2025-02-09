<script setup lang="ts">
    type ButtonDefaultProps = {
        variant?: 'solid' | 'outlined' | 'icon'
        size?: 'xl' | 'xs' | 'md'
        type?: 'primary' | 'light' | 'info' | 'danger' | 'warning'
        as?: string,
        persmission?: string
    }

    withDefaults(defineProps<ButtonDefaultProps>(), {
        as: 'button',
        variant: 'solid',
        size: 'md',
        type: 'primary',
        persmission: '*'
    })

    const { can } = useAuthorization()
</script>

<template>
    <component :is="as" :class="{
        'btn': true,
        ['btn--' + size]: true,
        ['btn--' + variant]: true,
        ['btn__' + type]: true,
    }" v-if="can(persmission)">
        <slot />
    </component>
</template>