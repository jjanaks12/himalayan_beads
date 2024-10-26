<script setup lang="ts">
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import { loginSchema } from '~/lib/schema/account.schema'

    definePageMeta({
        layout: 'simple',
        middleware: 'auth',
        auth: {
            unauthenticatedOnly: true,
            navigateAuthenticatedTo: '/dashboard'
        }
    })

    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const { signIn } = useAuth()

    const formSubmit = (values: any) => {
        isLoading.value = true

        signIn('credentials', {
            ...values,
            redirect: false,
            callbackUrl: '/dashboard'
        })
            .then(({ ok }: any) => {
                console.log(route.query.callbackUrl as string);
                
                if (ok)
                    if (route.query.callbackUrl)
                        router.push(route.query.callbackUrl as string)
                    else
                        router.push('/dashboard')
            })
            .finally(() => {
                isLoading.value = false
            })
    }
</script>

<template>
    <section class="account__section">
        <div class="account__body">
            <Brand />
            <Form class="account__form" id="login-form" @submit="formSubmit" :validationSchema="loginSchema">
                <div class="account__form__text">
                    <h1 class="h2">Login</h1>
                    <p>Welcome back!!</p>
                </div>
                <div class="form__group">
                    <label for="lf__email">Email</label>
                    <Field type="email" name="email" id="lf__email" />
                    <ErrorMessage class="input--error" name="email" />
                </div>
                <div class="form__group">
                    <label for="lf__password">Password</label>
                    <Field type="password" name="password" id="lf__password" />
                    <ErrorMessage class="input--error" name="password" />
                </div>
                <div class="text--right">
                    <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Sign in</button>
                </div>
            </Form>
            <div class="account__meta">
                <p>Has no account? <NuxtLink to="/register">signup</NuxtLink>
                </p>
            </div>
        </div>
    </section>
</template>