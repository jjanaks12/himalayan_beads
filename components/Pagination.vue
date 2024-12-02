<script lang="ts" setup>
  interface PaginationProps {
    total: number
    current: number
    onNext: any
    onPrev: any
    onGoto: any
  }

  const props = defineProps<PaginationProps>()
</script>

<template>
  <div class="pagination">
    <button type="button" @click="onPrev" :disabled="current == 1">
      <MdiIcon icon="mdiChevronLeft" size="18" />
    </button>
    <ul>
      <li v-for="page in total">
        <strong v-if="page == current">{{ page }}</strong>
        <a href="#" @click.prevent="onGoto(page)" v-else>{{ page }}</a>
      </li>
    </ul>
    <button type="button" @click="onNext" :disabled="current == total">
      <MdiIcon icon="mdiChevronRight" size="18" />
    </button>
  </div>
</template>
