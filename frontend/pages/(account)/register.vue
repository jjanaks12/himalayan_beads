<script lang="ts" setup>
    import { KeyRound, LoaderPinwheelIcon, MailIcon, User } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import { registerSchema } from '~/lib/schemas/accounts.schema'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Register'
    })

    definePageMeta({
        layout: 'simple'
    })
    const { register } = useAuthStore()
    const { isLoggedin } = storeToRefs(useAuthStore())
    const isLoading = ref(false)

    const signup = async (formData: any) => {
        isLoading.value = true
        await register(formData)
        navigateTo('/dashboard')
    }

    onMounted(() => {
        if (isLoggedin.value)
            navigateTo('/dashboard')
    })
</script>

<template>
    <main id="main" class="w-full max-w-[640px]">
        <div class="bg-white p-8 rounded-lg">
            <Brand class="w-[220px] text-center mx-auto mb-12" />
            <div class="text-sm mb-4">
                <h1 class="text-black text-xl">Join us</h1>
                <p>Create your account now – fill in the details below to register.</p>
            </div>
            <Form :validation-schema="registerSchema" method="post" @submit="signup" class="flex flex-col space-y-4">
                <div class="flex gap-3">
                    <div class="w-1/2">
                        <Field name="first_name" v-slot="{ field }">
                            <label class="sr-only" for="lf__first_name">First name</label>
                            <div class="flex gap-2">
                                <User class="mt-3" />
                                <div class="flex-grow">
                                    <Input v-bind="field" placeholder="First name" id="lf__first_name"
                                        autocomplete="first_name" />
                                    <ErrorMessage name="first_name" />
                                </div>
                            </div>
                        </Field>
                    </div>
                    <div class="w-1/2">
                        <Field name="last_name" v-slot="{ field }">
                            <label class="sr-only" for="lf__last_name">Last name</label>
                            <div class="flex gap-2">
                                <User class="mt-3" />
                                <div class="flex-grow">
                                    <Input v-bind="field" placeholder="Last name" id="lf__last_name"
                                        autocomplete="last_name" />
                                    <ErrorMessage name="last_name" />
                                </div>
                            </div>
                        </Field>
                    </div>
                </div>
                <Field name="email" v-slot="{ field }">
                    <label class="sr-only" for="lf__email">Email</label>
                    <div class="flex gap-2">
                        <MailIcon class="mt-3" />
                        <div class="flex-grow">
                            <Input v-bind="field" placeholder="Email" id="lf__email" autocomplete="email" />
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                </Field>
                <div class="flex gap-3">
                    <div class="w-1/2">
                        <Field name="password" v-slot="{ field }">
                            <label class="sr-only" for="lf__password">Password</label>
                            <div class="flex gap-2">
                                <KeyRound class="mt-3" />
                                <div class="flex-grow">
                                    <Input type="password" v-bind="field" placeholder="Password" id="lf__password"
                                        autocomplete="current-password" />
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                        </Field>
                    </div>
                    <div class="w-1/2">
                        <Field name="confirm_password" v-slot="{ field }">
                            <label class="sr-only" for="lf__confirm_password">Confirm Password</label>
                            <div class="flex gap-2">
                                <KeyRound class="mt-3" />
                                <div class="flex-grow">
                                    <Input type="password" v-bind="field" placeholder="Confirm password"
                                        id="lf__confirm_password" autocomplete="current-password" />
                                    <ErrorMessage name="confirm_password" />
                                </div>
                            </div>
                        </Field>
                    </div>
                </div>
                <div class="text-right">
                    <Button type="submit" class="w-[120px]" :disabled="isLoading">
                        <LoaderPinwheelIcon class="animate-spin relative" v-if="isLoading" />
                        Join now
                    </Button>
                </div>
            </Form>
        </div>
        <div class="text-gray-500 text-center text-sm pt-3">
            <NuxtLink to="/login" class="text-primary text-sm underline">Already have an account?</NuxtLink>
        </div>
    </main>
</template>