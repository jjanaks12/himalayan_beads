<script lang="ts" setup>
    import type { User } from '~/himalayan_beads'
    import { abbr, showImage } from '~/lib/filters'

    interface UserProp {
        user: User
    }

    const { public: { appName } } = useRuntimeConfig()
    const props = defineProps<UserProp>()

    const avatar = computed(() => showImage(props.user?.image?.name as string))
    const fullName = computed(() => [props.user?.first_name, props.user?.last_name].join(' ').trim())
</script>

<template>
    <div class="flex items-center gap-2 py-[3px]">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="avatar" class="object-cover" />
            <AvatarFallback>{{ abbr(fullName || appName) }}</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <strong class="block">
                <NuxtLink :to="`/dashboard/users/${user.id}`">{{ fullName || appName }}</NuxtLink>
            </strong>
            <em class="not-italic block">{{ user.email }}</em>
            <Badge variant="secondary">{{ user.role.name || 'user' }}</Badge>
        </div>
    </div>
</template>