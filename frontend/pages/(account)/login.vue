<script lang="ts" setup>
    import { KeyRoundIcon, UserIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import { loginSchema } from '~/lib/schemas/accounts.schema'

    useHead({
        title: 'Login'
    })

    definePageMeta({
        layout: 'simple'
    })
</script>

<template>
    <main id="main" class="w-full max-w-[480px]">
        <Brand class="mx-auto mb-8" />
        <Form class="bg-white p-4 flex flex-col gap-4 rounded-2xl" :validation-schema="loginSchema">
            <h1 class="text-2xl">Login form</h1>
            <Field as="div" class="flex gap-3" name="email" v-slot="{ field }">
                <UserIcon />
                <div class="flex flex-col gap-2 grow">
                    <label for="lf__email">Email</label>
                    <Input type="email" v-bind="field" />
                    <ErrorMessage name="email" />
                </div>
            </Field>
            <Field as="div" class="flex gap-3" name="password" v-slot="{ field }">
                <KeyRoundIcon />
                <div class="flex flex-col gap-2 grow">
                    <label for="lf__password">Password</label>
                    <Input type="password" v-bind="field" />
                    <ErrorMessage name="password" />
                </div>
            </Field>
            <div class="text-right">
                <Button type="submit">Login</Button>
            </div>
        </Form>
    </main>
</template>