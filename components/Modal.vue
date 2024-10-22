<script lang="ts" setup>
  const emit = defineEmits(['modal:close'])

  const modal = ref()
  const isActive = defineModel('show', {
    required: true,
    default: false
  })

  const closeModal = () => {
    isActive.value = false
    emit('modal:close')
  }

  const clickOnOutside = (event: Event) => {
    if (isActive.value) {
      
      if (!modal.value.contains(event.target)) {
        event.preventDefault()
        event.stopPropagation()
        closeModal()
      }
    }
  }

  watch(isActive, () => {
    if (isActive.value)
      setTimeout(() => {
        document.addEventListener('click', clickOnOutside)
      }, 500)
    else
      document.removeEventListener('click', clickOnOutside)
  })

</script>

<template>
  <Teleport to="body">
    <section :class="{ 'modal': true, 'modal--active': isActive }">
      <div class="modal__content" ref="modal">
        <a href="#" class="modal__close" @click.prevent="closeModal"><span class="icon-add"></span></a>
        <slot />
      </div>
    </section>
  </Teleport>
</template>
