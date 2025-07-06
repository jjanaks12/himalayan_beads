<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import { productCreateSchema } from '~/lib/schemas/product.schema'
    import { useCatgoryStore } from '~/store/category'
    import { useProductStore } from '~/store/product'

    interface ProductFormProps {
        id?: string | null
    }

    const isLoading = ref(false)
    const form = useTemplateRef<FormContext>('form')

    const props = defineProps<ProductFormProps>()
    const emit = defineEmits(['update'])
    const { categories } = storeToRefs(useCatgoryStore())
    const { fetch } = useCatgoryStore()
    const { save, getProduct } = useProductStore()

    const formSubmit = async (formData: any) => {
        isLoading.value = true
        await save(props.id ? { ...formData, id: props.id } : formData)
        emit('update')
        isLoading.value = false
    }

    const init = async () => {
        if (props.id) {
            const product = await getProduct(props.id)

            if (product && form.value) {
                form.value.setValues({
                    name: product.name,
                    category_id: product.category_id,
                })
            }
        }
    }

    onMounted(() => {
        if (categories.value.length == 0)
            fetch()

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
    <Form :validation-schema="productCreateSchema" @submit="formSubmit" class="flex flex-col gap-4" ref="form">
        <Field name="name" v-slot="{ field }">
            <Label for="lf__name">Product name</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Name" id="pf__name" />
                    <ErrorMessage name="name" />
                </div>
            </div>
        </Field>
        <Field name="category_id" v-slot="{ field }">
            <Label for="lf__category_id">Category</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Select v-bind="field" placeholder="Category" id="pf__category_id" :default-value="field.value">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem :value="category.id" v-for="category of categories">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="category_id" />
                </div>
            </div>
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>