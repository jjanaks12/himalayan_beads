<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import Jobs from '~/lib/jobs'
  import { useAppStore } from './store/app'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchCountry } = useAppStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    if (!isLoggedin.value)
      return

    job.add([fetch, fetchCountry])

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
