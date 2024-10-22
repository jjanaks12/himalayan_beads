<script lang="ts" setup>
  interface AccordionItemProps {
    title: string
    active?: boolean
  }

  const accordionItemIndex = ref<null | number>(null)
  const props = defineProps<AccordionItemProps>()
  const isActive = ref(false)
  defineExpose({ accordionItemIndex })

  onMounted(() => {
    if (props.active)
      isActive.value = props.active
  })
</script>

<template>
  <div :class="{ 'accordion__block': true, 'accordion__block--active': isActive }">
    <a class="accordion__opener" href="#" @click.prevent="isActive = !isActive">{{ title }}</a>
    <div class="accordion__slide">
      <div class="holder">
        <slot />
      </div>
    </div>
  </div>
</template>
