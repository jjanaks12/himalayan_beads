<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import type { Stock } from '~/himalayan_beads'
    import { productStockSchema } from '~/lib/schemas/product.schema'
    import { useProductStore } from '~/store/product'

    interface ProductStockFormProps {
        productId: string
        stock?: Stock
    }

    const isLoading = ref(false)
    const form = ref<FormContext>()

    const props = defineProps<ProductStockFormProps>()
    const emit = defineEmits(['update'])
    const { saveStock } = useProductStore()

    const handleSubmit = async (formData: any) => {
        isLoading.value = true
        await saveStock(formData, props.productId, props.stock?.id)
        emit('update')
        isLoading.value = false
    }

    const init = () => {
        if (form.value)
            form.value.setValues({
                quantity: props.stock?.quantity
            })
    }

    watch(props, () => {
        if (props.stock)
            init()
    }, {
        deep: true,
        immediate: true
    })

    onMounted(() => {
        init()
    })
</script>

<template>
    <Form :validation-schema="productStockSchema" @submit="handleSubmit" class="flex flex-col gap-4" ref="form">
        <Field name="quantity" v-slot="{ field }">
            <Label for="lf__quantity">Product quantity</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Quantity" id="pf__quantity" />
                    <ErrorMessage name="quantity" />
                </div>
            </div>
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                {{ stock ? 'Update stock' : 'Add stock'}}
            </Button>
        </div>
    </Form>
</template>