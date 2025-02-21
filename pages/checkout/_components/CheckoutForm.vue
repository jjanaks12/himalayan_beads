<script lang="ts" setup>
  import { Form, Field, ErrorMessage } from 'vee-validate'

  import { checkoutSchema } from '~/lib/schema/cart.schema'
  import { useAppStore } from '~/store/app'
  import { useCartStore } from '~/store/cart'

  const { countryList } = storeToRefs(useAppStore())
  const { list } = storeToRefs(useCartStore())
  const { fetchCountry } = useAppStore()
  const sameAsAbove = ref(false)
  const isLoading = ref(false)
  const form = ref()

  const formSubmit = async (values: any) => {
    isLoading.value = true
    await $fetch('/api/cart/checkout', {
      method: 'POST',
      body: { ...values, cart: list.value }
    })
      .then(() => {
        list.value = []
        navigateTo({
          name: 'product'
        })
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  onMounted(() => {
    if (countryList.value.length == 0)
      fetchCountry()
  })

  watch(sameAsAbove, () => {
    if (sameAsAbove.value) {
      const formData = { ...form.value.values }

      form.value.setValues({
        ...formData,
        shipping_street: formData.billing_street,
        shipping_address: formData.billing_address,
        shipping_city: formData.billing_city,
        shipping_state: formData.billing_state,
        shipping_zipcode: formData.billing_zipcode,
        shipping_country: formData.billing_country,
      })
    }
  })
</script>

<template>
  <Form :validation-schema="checkoutSchema" @submit="formSubmit" class="form" ref="form">
    <fieldset>
      <h3>Billing address</h3>
      <div class="row">
        <div class="col-6">
          <div class="form__group">
            <label for="cf__billing_street">Street</label>
            <Field name="billing_street" id="cf__billing_street" type="text" />
            <ErrorMessage name="billing_street" class="input--error" />
          </div>
        </div>
        <div class="col-6">
          <div class="form__group">
            <label for="cf__billing_address">Address</label>
            <Field name="billing_address" id="cf__billing_address" type="text" />
            <ErrorMessage name="billing_address" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__billing_city">City</label>
            <Field name="billing_city" id="cf__billing_city" type="text" />
            <ErrorMessage name="billing_city" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__billing_state">State</label>
            <Field name="billing_state" id="cf__billing_state" type="text" />
            <ErrorMessage name="billing_state" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__billing_zipcode">Zipcode</label>
            <Field name="billing_zipcode" id="cf__billing_zipcode" type="text" />
            <ErrorMessage name="billing_zipcode" class="input--error" />
          </div>
        </div>
        <div class="col-12">
          <div class="form__group">
            <label for="cf__billing_country">Country</label>
            <Field name="billing_country" v-slot="{ field }">
              <select v-bind="field" id="cf__billing_country">
                <option value="">Select a country</option>
                <option v-for="country in countryList" :value="country.id">{{ country.name }}</option>
              </select>
            </Field>
            <ErrorMessage name="billing_country" class="input--error" />
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <div class="row">
        <div class="col-8">
          <h3>Shipping address</h3>
        </div>
        <div class="col-4 text--right">
          <label class="custom__checkbox">
            <input type="checkbox" v-model="sameAsAbove">
            <span class="custom__checkbox__text">Same as above</span>
          </label>
        </div>
        <div class="col-6">
          <div class="form__group">
            <label for="cf__shipping_street">Street</label>
            <Field name="shipping_street" id="cf__shipping_street" type="text" />
            <ErrorMessage name="shipping_street" class="input--error" />
          </div>
        </div>
        <div class="col-6">
          <div class="form__group">
            <label for="cf__shipping_address">Address</label>
            <Field name="shipping_address" id="cf__shipping_address" type="text" />
            <ErrorMessage name="shipping_address" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__shipping_city">City</label>
            <Field name="shipping_city" id="cf__shipping_city" type="text" />
            <ErrorMessage name="shipping_city" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__shipping_state">State</label>
            <Field name="shipping_state" id="cf__shipping_state" type="text" />
            <ErrorMessage name="shipping_state" class="input--error" />
          </div>
        </div>
        <div class="col-4">
          <div class="form__group">
            <label for="cf__shipping_zipcode">Zipcode</label>
            <Field name="shipping_zipcode" id="cf__shipping_zipcode" type="text" />
            <ErrorMessage name="shipping_zipcode" class="input--error" />
          </div>
        </div>
        <div class="col-12">
          <div class="form__group">
            <label for="cf__shipping_country">Country</label>
            <Field name="shipping_country" v-slot="{ field }">
              <select v-bind="field" id="cf__shipping_country">
                <option value="">Select a country</option>
                <option v-for="country in countryList" :value="country.id">{{ country.name }}</option>
              </select>
            </Field>
            <ErrorMessage name="shipping_country" class="input--error" />
          </div>
        </div>
      </div>
    </fieldset>
    <div class="text--right">
      <Button type="submit" permission="create_order" :loading="isLoading">Checkout</Button>
    </div>
  </Form>
</template>

<style></style>