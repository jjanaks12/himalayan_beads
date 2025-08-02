<script lang="ts" setup>
    import { EllipsisVerticalIcon, PlusIcon, PencilIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'

    import type { Role } from '~/himalayan_beads'
    import { useRoleStore } from '~/store/role'

    import RoleForm from '@/components/pages/dashboard/role/form.vue'
    import { humanize } from '~/lib/filters'

    useHead({
        title: 'Roles'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: 'manage_role'
    })

    const { can } = useAuthorization()
    const { roles } = storeToRefs(useRoleStore())
    const { fetch, destory } = useRoleStore()

    const openEditRoleDialog = ref(false)
    const actionRole = ref<Role | null>(null)
    const openDeleteRoleDialog = ref(false)

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                Filters
            </div>
        </div>
        <Button @click="openEditRoleDialog = true">
            <PlusIcon />
            Add a role
        </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(role, index) of roles">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <strong class="block text-xl mb-2">{{ role.name }}</strong>
                    <ul class="flex flex-wrap gap-1">
                        <li class="bg-primary text-white px-3 py-1 text-sm rounded-xl"
                            v-for="permission in role.permissions">{{ humanize(permission.name) }}</li>
                    </ul>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_role')" @click="() => {
                                openEditRoleDialog = true
                                actionRole = role
                            }">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <!-- <DropdownMenuItem v-if="can('view_role')" @click="() => {
                                openEditRoleDialog = true
                                actionRole = role
                            }">
                                <EyeIcon />
                                View
                            </DropdownMenuItem> -->
                            <DropdownMenuItem v-if="can('delete_role')" @click="() => {
                                openDeleteRoleDialog = true
                                actionRole = role
                            }">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="openEditRoleDialog" @update:open="() => {
        openEditRoleDialog = false
        actionRole = null
    }">
        <DialogContent class="bg-white">
            <DialogTitle>Edit {{ actionRole?.name }}</DialogTitle>
            <DialogDescription>Modify existing role details to update user permissions and access rights.
            </DialogDescription>
            <RoleForm :role="actionRole" @update="() => {
                openEditRoleDialog = false
                actionRole = null
            }" />
        </DialogContent>
    </Dialog>
    <Dialog :open="openDeleteRoleDialog" @update:open="state => {
        openDeleteRoleDialog = state
        actionRole = null
    }">
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    Once deleted cannot be un done.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="destructive" @click="() => {
                    openDeleteRoleDialog = false
                    actionRole = null
                }">Cancel</Button>
                <Button variant="secondary" @click="async () => {
                    await destory(actionRole?.id as string)
                    openDeleteRoleDialog = false
                    actionRole = null
                    fetch()
                }">Yes, delete it</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>