<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import { categoryCreateSchema } from '~/lib/schemas/product.schema'
    import { useCatgoryStore } from '~/store/category'

    interface CategoryFormProps {
        id?: string | null
    }

    const isLoading = ref(false)
    const form = useTemplateRef<FormContext>('form')

    const props = defineProps<CategoryFormProps>()
    const { categories } = storeToRefs(useCatgoryStore())
    const { save, getCategory } = useCatgoryStore()
    const emit = defineEmits(['update'])

    const formSubmit = async (formData: any) => {
        isLoading.value = true
        await save(props.id ? { id: props.id, ...formData } : formData)
        emit('update')
        isLoading.value = false
    }

    const init = () => {
        if (props.id) {
            const category = getCategory(props.id)

            if (category && form.value) {
                form.value.setValues({
                    name: category.name,
                    description: category.description,
                    parent_id: category.parent_id
                })
            }
        }
    }

    onMounted(() => {
        init()
    })

    watch(props, () => {
        init()
    }, {
        deep: true,
        immediate: true
    })
</script>

<template>
    <Form :validation-schema="categoryCreateSchema" class="flex flex-col gap-4" @submit="formSubmit" ref="form">
        <Field name="name" v-slot="{ field }">
            <Label for="lf__name">Category name</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Name" id="pf__name" />
                    <ErrorMessage name="name" />
                </div>
            </div>
        </Field>
        <!-- <Field name="parent_id" v-slot="{ field, value }">
            <Label for="lf__parent_id">Parent</Label>
            {{ value }}
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Select v-bind="field" placeholder="Parent id" id="pf__parent_id">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a parent category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="category.id" v-for="category of categories">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="parent_id" />
                </div>
            </div>
        </Field> -->
        <Field name="description" v-slot="{ field }">
            <Label for="lf__description">Description</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Textarea type="text" v-bind="field" placeholder="Description" id="pf__description" />
                    <ErrorMessage name="description" />
                </div>
            </div>
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Save
            </Button>
        </div>
    </Form>
</template>