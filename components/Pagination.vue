<script lang="ts" setup>
  interface PaginationProps {
    total: number
    current: number
    onNext: any
    onPrev: any
    onGoto: any
    max?: number
  }

  const props = withDefaults(defineProps<PaginationProps>(), {
    max: 3
  })

  const pages = computed(() => {
    let length = props.max

    if (length > props.total)
      length = props.total

    let start = props.current - Math.floor(length / 2)
    start = Math.max(start, 1)
    start = Math.min(start, 1 + props.total - length)
    
    return Array.from({ length }, (_, i) => start + i)
  })
</script>

<template>
  <div class="pagination" v-if="total > 1">
    <button type="button" @click="onPrev" :disabled="current == 1">
      <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiChevronLeft" size="18" />
    </button>
    <ul>
      <li v-for="page in pages">
        <strong v-if="page == current">{{ page }}</strong>
        <a href="#" @click.prevent="onGoto(page)" v-else>{{ page }}</a>
      </li>
    </ul>
    <button type="button" @click="onNext" :disabled="current == total">
      <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiChevronRight" size="18" />
    </button>
  </div>
  <div class="pagination" v-else>
    <p class="pagination__text">No more pages</p>
  </div>
</template>
