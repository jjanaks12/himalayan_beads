<script lang="ts" setup>
    import { LinkIcon, LoaderIcon } from 'lucide-vue-next'
    import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'

    import type { Blog } from '~/himalayan_beads'
    import { debounce } from '~/lib/filters'
    import { slugify } from '~/lib/filters/humanize'
    import { blogCreateSchema } from '~/lib/schemas/blog.schema'
    import { useBlogStore } from '~/store/blogStore'
    import { useCatgoryStore } from '~/store/category'

    interface BlogFormProps {
        blog: Blog | null
    }

    const props = defineProps<BlogFormProps>()
    const emit = defineEmits(['update'])
    const { save } = useBlogStore()
    const { blogCategories } = storeToRefs(useCatgoryStore())
    const { fetch } = useCatgoryStore()

    const form = ref<FormContext>()
    const isLoading = ref(false)
    const updatedSlug = ref('')

    const handleSubmit = async (values: any) => {
        isLoading.value = true
        await save(values)
        isLoading.value = false
        emit('update')
    }

    const updateSlug = () => {
        updatedSlug.value = slugify(form.value?.values?.title as string)
        setTimeout(() => {
            form.value?.setFieldValue('slug', updatedSlug.value)
        }, 100)
    }

    const handleTitleChange = () => {
        debounce(() => {
            updatedSlug.value = slugify(form.value?.values?.title as string)
            form.value?.setFieldValue('slug', updatedSlug.value)
        })
    }

    onMounted(() => {
        if (blogCategories.value.length == 0)
            fetch()

        if (props.blog != null) {
            form.value?.setValues({
                id: props.blog.id,
                title: props.blog.title,
                slug: props.blog.slug,
                excerpt: props.blog.excerpt,
                category_id: props.blog.category_id,
            })
        }

        updatedSlug.value = props.blog?.slug as string
    })

    /* watch(() => form.value?.values.title, () => {
        //Unveiling the Power of Rudraksha Beads
        if (!form.value?.values.slug)
            form.value?.setFieldValue('slug', slugify(form.value?.values.title))
    }) */

    /* watch(updateSlug, () => {
        if (updateSlug.value)
            form.value?.setFieldValue('slug', computedSlug)
    }) */
</script>

<template>
    <Form :validation-schema="blogCreateSchema" @submit="handleSubmit" class="flex flex-col gap-4" ref="form">
        <Field name="id" type="hidden" />
        <Field as="div" name="title" v-slot="{ field }" class="flex flex-col gap-2">
            <Label for="bf__title">Title</Label>
            <Input type="text" v-bind="field" placeholder="Title" id="bf__title" @input="handleTitleChange" />
            <ErrorMessage name="title" />
        </Field>
        <Field as="div" name="slug" v-slot="{ field, value }" class="flex flex-col gap-2">
            <div class="flex" v-if="updatedSlug && updatedSlug == blog?.slug">
                <Badge variant="completed">{{ updatedSlug }}</Badge>
                <Button type="button" variant="link" size="sm" @click="updateSlug" v-if="updatedSlug != value">
                    <LinkIcon />
                    update URL
                </Button>
            </div>
            <template v-else>
                <Label for="bf__slug">Slug</Label>
                <Input type="text" v-bind="field" placeholder="Slug" id="bf__slug" />
                <ErrorMessage name="slug" />
            </template>
        </Field>
        <Field name="category_id" v-slot="{ field }">
            <Label for="lf__category_id">Category</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Select v-bind="field" placeholder="Category" id="pf__category_id" :default-value="blog?.category_id">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="category.id" v-for="category of blogCategories">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="category_id" />
                </div>
            </div>
        </Field>
        <Field as="div" name="excerpt" v-slot="{ field }" class="flex flex-col gap-2">
            <Label for="bf__excerpt">Excerpt</Label>
            <Textarea type="text" v-bind="field" placeholder="Excerpt" id="bf__excerpt" />
            <ErrorMessage name="excerpt" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Save
            </Button>
        </div>
    </Form>
</template>