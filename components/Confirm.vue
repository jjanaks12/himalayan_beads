<script lang="ts" setup>
  import * as Icons from '@mdi/js'

  interface ConfirmDialogProps {
    title: string
    text?: string
    icon?: keyof typeof Icons
    confirmText?: string
    cancelText?: string
  }

  const emit = defineEmits(['confirmed', 'canceled'])
  const props = withDefaults(defineProps<ConfirmDialogProps>(), {
    icon: 'mdiHelpCircle',
    cancelText: 'No',
    confirmText: 'Yes',
  })

  const showConfirm = defineModel('show', {
    required: true,
    default: false
  })

  const confirmAction = () => {
    emit('confirmed')
  }

  const cancelAction = () => {
    emit('canceled')
    showConfirm.value = false
  }
</script>

<template>
  <Modal :show="showConfirm" @modal:close="cancelAction">
    <div class="confirm__dialog">
      <div class="icon__holder" v-if="icon">
        <MdiIcon :icon="icon" size="64" />
      </div>
      <h2>{{ title }}</h2>
      <div class="text__holder">
        <p>{{ text }}</p>
      </div>
      <div class="confirm__dialog__action">
        <a href="#" class="btn btn__primary btn--outline" @click.prevent="cancelAction">
          <MdiIcon icon="mdiClose" />
          {{ cancelText }}
        </a>
        <a href="#" class="btn btn__primary" @click.prevent="confirmAction">
          <MdiIcon icon="mdiCheck" />
          {{ confirmText }}
        </a>
      </div>
    </div>
  </Modal>
</template>
