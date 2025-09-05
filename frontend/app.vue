<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import Jobs from '~/lib/jobs'
  import { useAppStore } from './store/app'
  import { usePermissionStore } from './store/permission'
  import { useRoleStore } from './store/role'
  import { useBlogStore } from './store/blogStore'
  import { useCatgoryStore } from './store/category'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchCountry, fetchCompany } = useAppStore()
  const { fetch: fetchPermission } = usePermissionStore()
  const { fetch: fetchRole } = useRoleStore()
  const { fetch: fetchBlog } = useBlogStore()
  const { fetch: fetchCategory } = useCatgoryStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    const taskList = [fetchBlog, fetchCategory, fetchCompany]
    if (isLoggedin.value)
      taskList.push(fetch, fetchCountry, fetchPermission, fetchRole)

    job.add(taskList)
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
