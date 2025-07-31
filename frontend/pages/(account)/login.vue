<script lang="ts" setup>
    import { KeyRoundIcon, LoaderPinwheelIcon, UserIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { loginSchema } from '~/lib/schemas/accounts.schema'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Login'
    })

    definePageMeta({
        layout: 'simple'
    })

    const route = useRoute()
    const { isLoggedin } = storeToRefs(useAuthStore())
    const { login } = useAuthStore()

    const isLoading = ref(false)

    const signIn = async (formData: any) => {
        isLoading.value = true
        await login(formData, route.query.redirect_from as string)
        isLoading.value = false
    }

    onMounted(() => {
        if (isLoggedin.value)
            navigateTo('/dashboard')
    })
</script>

<template>
    <main id="main" class="w-full max-w-[480px]">
        <Brand class="mx-auto mb-8" />
        <Form class="bg-white text-gray-400 p-8 flex flex-col gap-4 rounded-2xl" :validation-schema="loginSchema"
            @submit="signIn">
            <div class="text-sm mb-4">
                <h1 class="text-black text-xl">Welcome back</h1>
                <p>Access your account securely – please enter your login details.</p>
            </div>
            <Field as="div" class="flex gap-3" name="email" v-slot="{ field }">
                <UserIcon />
                <div class="flex flex-col gap-2 grow">
                    <Label for="lf__email">Email</Label>
                    <Input type="email" v-bind="field" id="lf__email" />
                    <ErrorMessage name="email" />
                </div>
            </Field>
            <Field as="div" class="flex gap-3" name="password" v-slot="{ field }">
                <KeyRoundIcon />
                <div class="flex flex-col gap-2 grow">
                    <Label for="lf__password">Password</Label>
                    <Input type="password" v-bind="field" id="lf__password" />
                    <ErrorMessage name="password" />
                </div>
            </Field>
            <div class="text-right">
                <Button type="submit" :disabled="isLoading">
                    <LoaderPinwheelIcon class="animate-spin relative" v-if="isLoading" />
                    Login
                </Button>
            </div>
        </Form>
        <div class="text-gray-500 text-center text-sm pt-3">
            <p>
                Do you not have account?
                <NuxtLink :to="{ name: 'register' }" class="underline hover:text-primary">Sign up</NuxtLink>
            </p>
        </div>
    </main>
</template>