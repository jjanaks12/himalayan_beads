<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, ShieldCheckIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
    import type { User } from '~/himalayan_beads'

    import { useUserStore } from '~/store/user'

    import ChangeRoleForm from '@/components/pages/dashboard/user/roleForm.vue'
    useHead({
        title: 'User'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: 'manage_user'
    })

    const { can } = useAuthorization()
    const { users, params } = storeToRefs(useUserStore())
    const { fetch } = useUserStore()

    const isUserRoleChangeDialogOpen = ref(false)
    const tempUser = ref<User | null>(null)

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <div class="flex gap-4 mb-20">
        <Button @click="fetch">fetch</Button>
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                Filters
            </div>
        </div>
        <Search />
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(user, index) in users">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <User :user="user" />
                </TableCell>
                <TableCell>
                    <Badge variant="completed" v-if="user.emailVerified">
                        <ShieldCheckIcon />
                        verified
                    </Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu v-if="user?.role?.name !== 'Admin'">
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <!-- <DropdownMenuItem v-if="can('update_user')">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_user')">
                                <EyeIcon />
                                View
                            </DropdownMenuItem> -->
                            <DropdownMenuItem v-if="can('update_user')" @click="() => {
                                isUserRoleChangeDialogOpen = true
                                tempUser = user
                            }">
                                <TrashIcon />
                                Change role
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_user')">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
    <Dialog :open="isUserRoleChangeDialogOpen" @update:open="() => {
        isUserRoleChangeDialogOpen = false
        tempUser = null
    }">
        <DialogContent class="bg-white">
            <DialogTitle>Update {{ tempUser?.first_name }}'s' role</DialogTitle>
            <DialogDescription>Change role of users</DialogDescription>
            <ChangeRoleForm :user="tempUser" @update="() => {
                isUserRoleChangeDialogOpen = false
                tempUser = null
                fetch()
            }" />
        </DialogContent>
    </Dialog>
</template>