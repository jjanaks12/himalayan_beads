<script lang="ts" setup>
    import AppSidebar from './(partials)/_sidebar.vue'
    import AppHeader from './(partials)/_header.vue'
    import { useAuthStore } from '~/store/auth'

    const route = useRoute()
    const { isLoading } = storeToRefs(useAuthStore())
    const { can } = useAuthorization()

    const hasAccess = ref(false)

    onMounted(() => {
        if (route.meta?.authorization)
            // @ts-expect-error
            hasAccess.value = can(route.meta?.authorization, route.meta?.role)
    })

    watchEffect(() => {
        if (route.meta?.authorization)
            // @ts-expect-error
            hasAccess.value = can(route.meta?.authorization, route.meta?.role)
    })
</script>

<template>
    <SidebarProvider v-if="!isLoading" class="bg-gray-200">
        <AppSidebar />
        <main id="main" class="grow">
            <AppHeader />
            <div class="bg-white m-4 p-4 rounded-xl">
                <ClientOnly>
                    <slot v-if="hasAccess" />
                </ClientOnly>
                <p v-if="!hasAccess">You do not have access to see this page</p>
            </div>
        </main>
    </SidebarProvider>
    <div class="bg-white h-screen flex w-full gap-4 p-4" v-else>
        <div class="h-full w-[250px]">
            <div class="flex gap-4">
                <Skeleton class="w-[50px] h-[50px] rounded-full" />
                <div class="grow space-y-2">
                    <Skeleton class="w-full h-[25px] rounded-full" />
                    <Skeleton class="w-full h-[15px] rounded-full" />
                    <Skeleton class="w-[75px] h-[15px] rounded-full" />
                </div>
            </div>
        </div>
        <Skeleton class="h-full grow rounded-xl">
            Loading....
        </Skeleton>
    </div>
</template>