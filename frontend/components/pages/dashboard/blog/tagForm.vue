<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { ErrorMessage, Field, Form } from 'vee-validate'

    import type { Tag } from '~/himalayan_beads'
    import { blogTagSchema } from '~/lib/schemas/blog.schema'
    import { useBlogStore } from '~/store/blogStore'

    interface BlogTagProps {
        blogId: string
        tags?: Tag[]
    }

    const props = defineProps<BlogTagProps>()
    const emit = defineEmits(['update'])
    const { saveTags } = useBlogStore()

    const isSaving = ref(false)

    const handleSubmit = async (values: any) => {
        isSaving.value = true
        await saveTags(props.blogId, values)
        isSaving.value = false
        emit('update')
    }
</script>

<template>
    <Form :validation-schema="blogTagSchema" @submit="handleSubmit" class="flex flex-col gap-4">
        <Field as="div" name="tag" v-slot="{ field }" class="flex flex-col gap-2">
            <Label for="bf__tag">Tag</Label>
            <Input type="text" v-bind="field" placeholder="Tag" id="bf__tag" />
            <ErrorMessage name="tag" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isSaving">
                <LoaderIcon class="animate-spin relative" v-if="isSaving" />
                Save
            </Button>
        </div>
    </Form>
</template>