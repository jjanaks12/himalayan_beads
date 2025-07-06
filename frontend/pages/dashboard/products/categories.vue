<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-vue-next'

    import CategoryCreateForm from '@/components/pages/dashboard/product/categoryForm.vue'
    import { useCatgoryStore } from '~/store/category'

    useHead({
        title: 'Category'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { can } = useAuthorization()
    const { categories } = storeToRefs(useCatgoryStore())
    const { fetch } = useCatgoryStore()

    const isOpened = ref(false)
    const categoryId = ref<string | null>(null)

    const close = () => {
        isOpened.value = false
        categoryId.value = null
    }

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <div class="text-right mb-4">
        <Button @click="isOpened = true">
            <PlusIcon />
            Add category
        </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="category in categories">
                <TableCell>
                    <em class="not-italic block text-gray-400">{{ category.id }}</em>
                    <strong class="text-lg">{{ category.name }}</strong>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_category')" @click="() => {
                                categoryId = category.id
                                isOpened = true
                            }">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_category')">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="isOpened" @update:open="state => {
        isOpened = state
        categoryId = null
    }">
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add new category</DialogTitle>
                <DialogDescription>
                    To add product category
                </DialogDescription>
            </DialogHeader>
            <CategoryCreateForm :id="categoryId" @update="close" />
        </DialogContent>
    </Dialog>
</template>