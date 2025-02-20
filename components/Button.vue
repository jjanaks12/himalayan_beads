<script lang="ts" setup>
  interface ButtonProps {
    color?: 'primary' | 'secondary' | 'danger' | 'success' | 'info'
    variant?: 'default' | 'outlined'
    permission?: string | string[]
    loading?: boolean
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    color: 'primary',
    variant: 'default',
    permission: '*'
  })

  const { can } = useAuthorization()

  const classList = computed(() => ({
    'btn': true,
    'loading': props.loading,
    [`btn__${props.color}`]: true,
    [`btn--${props.variant}`]: true,
  }))
</script>

<template>
  <button v-if="can(permission)" :class="classList">
    <slot />
  </button>
</template>
