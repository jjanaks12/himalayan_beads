<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
    import { usePermissionStore } from '~/store/permission'

    useHead({
        title: 'Permission'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { can } = useAuthorization()
    const { permissions } = storeToRefs(usePermissionStore())
    const { fetch } = usePermissionStore()

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
            <TableRow v-for="(role, index) of permissions">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ role.name }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_permission')">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_permission')">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_permission')">
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