<script setup lang="ts">
    import type { Product } from '@prisma/client'
    import { Form, Field, ErrorMessage, type SubmissionContext } from 'vee-validate'

    import { productSchema } from '~/lib/schema/product.schema'
    import { useProductStore } from '~/store/product';
    import { useProductCategoryStore } from '~/store/productCategory'

    interface ProductFormProps {
        product?: Product | null
    }
    const props = defineProps<ProductFormProps>()
    const emit = defineEmits(['update-form'])
    const { fetchCategory } = useProductCategoryStore()
    const { categoryList } = storeToRefs(useProductCategoryStore())
    const { saveProduct } = useProductStore()

    const form = ref()
    const isLoading = ref(false)

    const formSubmit = (values: any, { resetForm }: SubmissionContext) => {
        isLoading.value = true

        saveProduct(({ ...values }))
            .then(() => {
                emit('update-form')
                resetForm()
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const initializeForm = () => {
        form.value?.resetForm()

        if (props.product) {
            form.value?.setFieldValue('id', props.product.id)
            form.value?.setFieldValue('name', props.product.name)
            form.value?.setFieldValue('description', props.product.description || '')
            form.value?.setFieldValue('category_id', props.product.category_id || '')
        }
    }

    watch(props, () => {
        initializeForm()
    }, {
        deep: true,
        immediate: true
    })

    onMounted(() => {
        if (categoryList.value.length == 0)
            fetchCategory()
    })
</script>

<template>
    <Form class="form" :validation-schema="productSchema" @submit="formSubmit" ref="form">
        <div class="form__group">
            <label for="pf__name">Name</label>
            <Field type="text" name="name" id="pf__name" />
            <ErrorMessage name="name" class="input--error" />
        </div>
        <div class="form__group">
            <label for="cf__category_id">Category</label>
            <Field name="category_id" v-slot="{ field }">
                <select v-bind="field" id="cf__category_id">
                    <option value="">Select a parent</option>
                    <template v-for="category in categoryList">
                        <option :value="category.id">{{ category.name }}</option>
                        <template v-if="category.predecessor.length > 0">
                            <option v-for="subCategory in category.predecessor" :value="subCategory.id">&nbsp;&nbsp; {{
                                subCategory.name }}</option>
                        </template>
                    </template>
                </select>
            </Field>
            <ErrorMessage class="input--error" name="category_id" />
        </div>
        <div class="text--right">
            <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Save</button>
        </div>
    </Form>
</template>