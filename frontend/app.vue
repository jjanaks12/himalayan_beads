<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import Jobs from '~/lib/jobs'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    if (!isLoggedin.value)
      return

    job.add([fetch])

    await job.run()
      .finally(() => {
        isLoading.value = false
      })
  }

  watch(isLoggedin, () => {
    initPage()
  })

  onMounted(() => {
    initPage()
  })
</script>

<template>
  <NuxtLayout v-cloak>
    <NuxtPage />
  </NuxtLayout>
</template>
