<script setup lang="ts">
    import { ErrorMessage, Field, Form } from 'vee-validate'
    import { productPriceSchema } from '~/lib/schema/product.schema'

    const route = useRoute()
    const emit = defineEmits(['update'])

    const isLoading = ref(false)

    const product_id = computed(() => route.params.id)

    const formSubmit = async (values: any) => {
        isLoading.value = true

        await $fetch(`/api/product/${route.params.id}/rate`, {
            method: 'POST',
            body: { ...values }
        })
            .then(() => {
                emit('update')
            })
            .finally(() => {
                isLoading.value = false
            })
    }
</script>

<template>
    <Form :validation-schema="productPriceSchema" @submit="formSubmit" class="form" v-slot="{ errors }">
        <Field type="hidden" name="product_id" :value="product_id" />
        <div class="form__group">
            <label for="prf__amount">Amount</label>
            <Field type="number" name="amount" id="prf__amount" />
            <ErrorMessage class="input--error" name="amount" />
        </div>
        <div class="text--right">
            <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Save</button>
        </div>
    </Form>
</template>