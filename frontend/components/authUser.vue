<script lang="ts" setup>
    import { useAuthStore } from '~/store/auth'
    import { abbr, showImage } from '@/lib/filters'

    const { public: { appName } } = useRuntimeConfig()
    const { user, role } = storeToRefs(useAuthStore())

    const avatar = computed(() => showImage(user.value?.image?.name as string))
</script>

<template>
    <div class="flex items-center gap-2 py-[3px]">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="avatar" class="object-cover" />
            <AvatarFallback>{{ abbr(user?.name || appName) }}</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <strong class="block">
                <NuxtLink :to="{ name: 'dashboard' }">{{ user?.name || appName }}</NuxtLink>
            </strong>
            <Badge variant="secondary">{{ role || 'user' }}</Badge>
        </div>
    </div>
</template>