<script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Primitive, type PrimitiveProps } from 'reka-ui'
  import { cn } from '@/lib/utils'
  import { type ButtonVariants, buttonVariants } from '.'

  interface Props extends PrimitiveProps {
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: HTMLAttributes['class']
    role?: string
    permissions?: string | string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
  })

  const { can } = useAuthorization()
  const showButton = ref(true)

  onMounted(() => {
    if (props.role)
      showButton.value = can('', props.role)

    if (props.permissions)
      showButton.value = can(props.permissions)
  })
</script>

<template>
  <Primitive data-slot="button" :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), props.class)"
    v-if="showButton">
    <slot />
  </Primitive>
</template>
