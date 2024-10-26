<script lang="ts" setup>

  onMounted(() => {
    document.body.classList.add('simple--layout')
  })
</script>

<template>
  <div id="simple" class="simple--layout">
    <slot />
  </div>
</template>