<script lang="ts" setup>
    import { LoaderIcon, MoveLeftIcon, PencilIcon } from 'lucide-vue-next'

    import { useBlogStore } from '~/store/blogStore'
    import type { Blog } from '~/himalayan_beads'

    import BlogForm from '@/components/pages/dashboard/blog/form.vue'
    import TagForm from '@/components/pages/dashboard/blog/tagForm.vue'
    import BlogBodyContent from '~/components/pages/dashboard/blog/blogBody.vue'
    import { humanize } from '~/lib/filters'

    useHead({
        title: 'Blogs'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['update_blog', 'view_blog']
    })

    const route = useRoute()
    const { getBlog, publishBlog } = useBlogStore()
    const { can } = useAuthorization()

    const isBlogFormOpened = ref(false)
    const isTagFormOpened = ref(false)
    const isPublishing = ref(false)
    const blog = ref<Blog | null>(null)

    const fetch = async () => {
        blog.value = await getBlog(route.params.id as string)
    }

    onBeforeMount(() => {
        fetch()
    })

    const close = () => {
        isBlogFormOpened.value = false
        fetch()
    }
</script>

<template>
    <div class="flex items-center gap-4 mb-20">
        <div class="flex-grow">
            <h1 class="text-2xl">{{ blog?.title }}</h1>
        </div>
        <div class="flex gap-2 items-center">
            <Button @click="isBlogFormOpened = true" permissions="update_blog">
                <PencilIcon />
                Edit blog
            </Button>
            <Button variant="link" @click="navigateTo({ name: 'dashboard-blogs' })">
                <MoveLeftIcon />
                Back
            </Button>
        </div>
    </div>
    <div class="flex gap-4 mb-8">
        <div class="w-2/3">
            <BlogBodyContent :blog="blog" v-if="blog" @update="fetch" />
        </div>
        <div class="w-1/3">
            <div class="text-right mb-4" v-if="!blog?.publishedAt">
                <Button variant="secondary" permissions="update_blog" @click="async () => {
                    isPublishing = true
                    await publishBlog(blog?.id as string)
                    await fetch()
                    isPublishing = false
                }">
                    <LoaderIcon class="animate-spin relative" v-if="isPublishing" />
                    Publish
                </Button>
            </div>
            <h2 class="text-lg">Excerpt</h2>
            <p class="mb-4">{{ blog?.excerpt }}</p>
            <h2 class="text-lg">Tags</h2>
            <div class="mb-4">
                <div class="flex flex-wrap gap-2 mb-4">
                    <Badge variant="new" v-for="tag in blog?.tags">{{ humanize(tag.name) }}</Badge>
                </div>
                <Button @click="isTagFormOpened = true" permissions="update_blog">
                    {{ blog?.tags.length == 0 ? 'Add tags' : 'Add more tags' }}
                </Button>
            </div>
            <!-- <h2 class="text-lg">Stats</h2> -->
            <h2 class="text-lg">Featured image</h2>
            <PagesDashboardBlogFeaturedImage :blog-id="blog?.id" :image="blog?.image" v-if="blog" @update="fetch" />
        </div>
    </div>
    <Dialog :open="isBlogFormOpened" @update:open="state => {
        isBlogFormOpened = state
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add new blog</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            <BlogForm :blog="blog" @update="close" />
        </DialogContent>
    </Dialog>
    <Dialog :open="isTagFormOpened" @update:open="state => {
        isTagFormOpened = state
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="bg-white">
            <DialogHeader>
                <DialogTitle>Add new tag to blog</DialogTitle>
                <DialogDescription>
                    Add a new tag to organize and categorize your blog posts.
                </DialogDescription>
            </DialogHeader>
            <TagForm :blog-id="(blog?.id as string)" @update="() => {
                isTagFormOpened = false
                fetch()
            }" />
        </DialogContent>
    </Dialog>
</template>