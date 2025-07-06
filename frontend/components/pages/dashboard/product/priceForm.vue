<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import type { Price } from '~/himalayan_beads'
    import { productPriceSchema } from '~/lib/schemas/product.schema'
    import { useProductStore } from '~/store/product'

    interface PriceFormProps {
        price?: Price | null
        productId: string
    }

    const props = defineProps<PriceFormProps>()
    const emit = defineEmits(['update'])
    const { savePrice } = useProductStore()

    const isLoading = ref(false)
    const form = ref<FormContext>()

    const formHandler = async (formData: any) => {
        isLoading.value = true
        await savePrice(props.productId, { ...formData, id: props.price?.id })
        emit('update')
        isLoading.value = false
    }

    const init = () => {
        if (form.value)
            form.value.setValues({
                amount: props.price?.amount
            })
    }

    watch(props, () => {
        if (props.price)
            init()
    }, {
        immediate: true,
        deep: true
    })

    onMounted(() => {
        if (props.price)
            init()
    })
</script>

<template>
    <Form :validation-schema="productPriceSchema" @submit="formHandler" class="flex flex-col gap-4" ref="form">
        <Field name="amount" v-slot="{ field }">
            <Label for="lf__amount">Amount</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Amount" id="pf__amount" />
                    <ErrorMessage name="amount" />
                </div>
            </div>
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                {{ price ? 'Update stock' : 'Add stock' }}
            </Button>
        </div>
    </Form>
</template>