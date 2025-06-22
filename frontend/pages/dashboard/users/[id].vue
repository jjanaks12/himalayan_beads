<script lang="ts" setup>
    import type { User } from '~/himalayan_beads'
    import { useUserStore } from '~/store/user'

    const user = ref<User | null>(null)
    const route = useRoute()
    const router = useRouter()
    const { getUser } = useUserStore()

    useHead({
        title: 'User detail'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    onBeforeMount(async () => {
        user.value = await getUser(route.params.id as string)
    })

    const fullName = computed(() => [user.value?.first_name, user.value?.last_name].join(' ').trim())
</script>

<template>
    <Button @click="router.go(-1)">Back</Button>
    <h1>{{ fullName }}</h1>
</template>