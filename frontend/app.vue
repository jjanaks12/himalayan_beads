<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import Jobs from '~/lib/jobs'
  import { useAppStore } from './store/app'
  import { usePermissionStore } from './store/permission'
  import { useRoleStore } from './store/role'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchCountry } = useAppStore()
  const { fetch: fetchPermission } = usePermissionStore()
  const { fetch: fetchRole } = useRoleStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    const taskList = []
    if (!isLoggedin.value)
      return


    job.add([fetch, fetchCountry, fetchPermission, fetchRole])
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
