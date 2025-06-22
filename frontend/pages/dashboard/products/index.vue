<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'

    useHead({
        title: 'Product'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { can } = useAuthorization()
</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Name</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_product')">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_product')">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_product')">
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