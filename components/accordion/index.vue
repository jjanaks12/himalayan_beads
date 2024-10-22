<script lang="ts" setup>
  // const slots = useSlots()

  const currentIndex = ref(0)

  /* onMounted(() => {
    if (slots.default)
      slots.default().forEach(($item, index: number) => {
        console.log($item);
        // $item.accordionItemIndex.value = index
      })
  }) */
</script>

<template>
  <div class="accordion">
    <slot />
  </div>
</template>
