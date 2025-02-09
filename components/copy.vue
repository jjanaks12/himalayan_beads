<script lang="ts" setup>
  interface CopyProps {
    copyText: string
  }

  const props = defineProps<CopyProps>()
  const isCopied = ref(false)

  const copyNow = () => {
    const $copyText = document.createElement("input")
    $copyText.value = props.copyText

    $copyText.select()
    $copyText.setSelectionRange(0, 99999) // For mobile devices
    navigator.clipboard.writeText($copyText.value)

    isCopied.value = true
  }

  watch(isCopied, () => {
    if (isCopied.value)
      setTimeout(() => {
        isCopied.value = false
      }, 3000)
  })
</script>

<template>
  <div class="copy">
    <a href="#" @click.prevent="copyNow" v-if="!isCopied" class="copy__btn" title="Click to copy">
      <slot />
      <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiContentCopy" />
    </a>
    <span class="copy__text" v-else>
      Copied
      <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiCheck" />
    </span>
  </div>
</template>