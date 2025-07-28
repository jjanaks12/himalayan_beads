<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
    import { useRoleStore } from '~/store/role'

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
    const { fetch } = useRoleStore()

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
                        <li class="bg-primary text-white px-3 py-1 text-sm rounded-xl" v-for="permission in role.permissions">{{ permission.name }}</li>
                    </ul>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_role')">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_role')">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_role')">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>