<script lang="ts" setup>
    import { EllipsisVerticalIcon, EyeIcon, PencilIcon, PlusIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'

    import { useBlogStore } from '~/store/blogStore'
    import BlogForm from '@/components/pages/dashboard/blog/form.vue'
    import type { Blog } from '~/himalayan_beads'
    import { formatDate } from '~/lib/filters'

    useHead({
        title: 'Blogs'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['create_blog', 'update_blog', 'view_blog', 'delete_blog']
    })
    const { can } = useAuthorization()
    const { params, blogs, query } = storeToRefs(useBlogStore())
    const { fetch, destory } = useBlogStore()

    const isBlogFormOpened = ref(false)
    const isProductDeleteOpened = ref(false)
    const editBlog = ref<Blog | null>(null)

    const close = () => {
        isBlogFormOpened.value = false
        editBlog.value = null
        fetch()
    }

    onMounted(() => {
        query.value = {
            ...query.value,
            filter: {
                published: false
            }
        }
        fetch()
    })
</script>

<template>
    <div class="flex items-center gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                Filters
            </div>
        </div>
        <div class="flex gap-2 items-center">
            <Search @update:search="(val) => { query = { ...query, s: val } }" />
            <Button @click="isBlogFormOpened = true" permissions="create_blog">
                <PlusIcon />
                Add blog
            </Button>
        </div>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="blog in blogs">
                <TableCell>
                    <div class="flex flex-col gap-1">
                        <strong>
                            <NuxtLink :to="{ name: 'dashboard-blogs-id', params: { id: blog.id } }">
                                {{ blog.title }}
                            </NuxtLink>
                        </strong>
                        <em class="not-italic text-gray-400" v-if="blog.publishedAt">
                            {{ formatDate(blog.publishedAt) }}
                        </em>
                        <Badge variant="pending" v-else>not published</Badge>
                    </div>
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">{{ blog?.category?.name }}</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVerticalIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem v-if="can('update_blog')" @click="() => {
                                editBlog = blog
                                isBlogFormOpened = true
                            }">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('view_blog')" @click="navigateTo({
                                name: 'dashboard-blogs-id',
                                params: {
                                    id: blog.id
                                }
                            })">
                                <EyeIcon />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="can('delete_blog')" @click="() => {
                                isProductDeleteOpened = true
                                editBlog = blog
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
    <Dialog :open="isBlogFormOpened" @update:open="state => {
        isBlogFormOpened = state
        editBlog = null
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>{{ editBlog ? 'Edit blog' : 'Add new blog' }}</DialogTitle>
                <DialogDescription>
                    You can edit title, slug, category and excerpt from here.
                </DialogDescription>
            </DialogHeader>
            <BlogForm :blog="editBlog" @update="close" />
        </DialogContent>
    </Dialog>
    <Dialog :open="isProductDeleteOpened" @update:open="state => {
        isProductDeleteOpened = state
        editBlog = null
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
                    isProductDeleteOpened = false
                    editBlog = null
                }">Cancel</Button>
                <Button variant="secondary" @click="async () => {
                    await destory(editBlog?.id as string)
                    isProductDeleteOpened = false
                    editBlog = null
                    fetch()
                }">Yes, delete it</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>