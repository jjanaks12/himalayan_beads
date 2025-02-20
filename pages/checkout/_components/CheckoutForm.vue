<script lang="ts" setup>
  import { Form, Field, ErrorMessage } from 'vee-validate'

  import { checkoutSchema } from '~/lib/schema/cart.schema'
  import { useAppStore } from '~/store/app'

  const { countryList } = storeToRefs(useAppStore())
  const { fetchCountry } = useAppStore()
  const sameAsAbove = ref(true)

  const formSubmit = (values: any) => {
    console.log(values)
  }

  onMounted(() => {
    if (countryList.value.length == 0)
      fetchCountry()
  })

</script>

<template>
  <Form :validation-schema="checkoutSchema" @submit="formSubmit" class="form">
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
            <Field name="billing_country" id="cf__billing_country" v-slot="{ field }">
              <select v-bind="field">
                <option value="">Select a country</option>
                <option v-for="country in countryList" :value="country.abbr">{{ country.name }}</option>
              </select>
            </Field>
            <ErrorMessage name="billing_country" class="input--error" />
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <div class="row holder">
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
      </div>
      <div class="col-12">
        <div class="form__group">
          <label for="cf__shipping_country">Country</label>
          <Field name="shipping_country" id="cf__shipping_country" v-slot="{ field }">
            <select v-bind="field">
              <option value="">Select a country</option>
              <option v-for="country in countryList" :value="country.abbr">{{ country.name }}</option>
            </select>
          </Field>
          <ErrorMessage name="shipping_country" class="input--error" />
        </div>
      </div>
    </fieldset>
    <div class="text--right">
      <Button type="submit" permission="create_order">Checkout</Button>
    </div>
  </Form>
</template>

<style></style>