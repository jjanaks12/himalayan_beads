<script setup lang="ts">
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import { registerSchema } from '~/lib/schema/account.schema'

  import Brand from '@/components/brand.vue'

  definePageMeta({
    layout: 'simple',
    middleware: 'auth',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/dashboard'
    }
  })

  const route = useRoute()
  const router = useRouter()
  const isLoading = ref(false)

  const formSubmit = (values: any) => {
    isLoading.value = true

    $fetch('/api/auth/register', {
      method: "POST",
      body: { ...values }
    })
      .then((response: any) => {
        if (response.status)
          if (route.query.callbackUrl)
            router.push(route.query.callbackUrl as string)
          else
            router.push('/dashboard')
      })
  }
</script>

<template>
  <section class="account__section">
    <div class="account__body">
      <Brand />
      <Form class="account__form" :validation-schema="registerSchema" @submit="formSubmit" id="register-form">
        <div class="account__form__text">
          <h1 class="h2">Welcome to our site</h1>
          <p>We are very happy to have you. I hope you would like our service</p>
        </div>
        <div class="form__group">
          <label for="rf__email">Email</label>
          <Field type="email" name="email" id="rf__email" />
          <ErrorMessage class="input--error" name="email" />
        </div>
        <div class="form__group">
          <label for="rf__password">Password</label>
          <Field type="password" name="password" id="rf__password" />
          <ErrorMessage class="input--error" name="password" />
        </div>
        <div class="form__group">
          <label for="rf__confirm_password">Confirm Password</label>
          <Field type="password" name="password_confirmation" id="rf__confirm_password" />
          <ErrorMessage class="input--error" name="password_confirmation" />
        </div>
        <div class="text--right">
          <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Sign up</button>
        </div>
      </Form>
      <div class="account__meta">
        <p>Already has an account? <NuxtLink to="/login">signin</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>