<script setup lang="ts">
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import { loginSchema } from '~/lib/schema/login.schema'

    definePageMeta({
        layout: 'simple',
        middleware: 'auth',
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard'
        }
    })

    const formSubmit = (values: any) => {
        console.log(values)
    }
</script>

<template>
    <section class="account__section">
        <div class="account__body">
            <Brand />
            <Form class="account__form" id="login-form" @submit="formSubmit" :validationSchema="loginSchema">
                <h1>Login</h1>
                <div class="form__group">
                    <label for="lf__email">Email</label>
                    <Field type="email" name="email" id="lf__email" />
                    <ErrorMessage name="email" />
                </div>
                <div class="form__group">
                    <label for="lf__password">Password</label>
                    <Field type="password" name="password" id="lf__password" />
                    <ErrorMessage name="password" />
                </div>
                <div class="text--right">
                    <button type="submit" class="btn btn__primary">Sign in</button>
                </div>
                <div class="account__meta">
                    <p>Has no account? <NuxtLink to="/register">signup</NuxtLink>
                    </p>
                </div>
            </Form>
        </div>
    </section>
</template>