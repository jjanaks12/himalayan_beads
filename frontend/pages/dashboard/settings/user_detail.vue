<script lang="ts" setup>
    import { IdCard, Loader, Mail, Phone } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
    import { abbr, showImage } from '~/lib/filters'

    import { userDetailSchema } from '~/lib/schemas/user.schema'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Personal details'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { updateDetail } = useAuthStore()
    const { isLoading, user, fullName } = storeToRefs(useAuthStore())
    const form = ref<FormContext | null>(null)

    const avatar = computed(() => showImage(user.value?.image?.name as string))

    const init = () => {
        if (form.value !== null && user.value) {
            form.value.setFieldValue('first_name', user.value.first_name)
            form.value.setFieldValue('last_name', user.value.last_name)
            form.value.setFieldValue('email', user.value.email)
            form.value.setFieldValue('image_id', user.value.image_id)
        }
    }

    const fileInputHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement).files
        if (!files)
            return

        const reader = new FileReader()
        if (files[0]) {
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                form.value?.setFieldValue('image', reader.result)
            }
        }
    }

    watch(user, () => {
        init()
    })

    onMounted(() => {
        init()
    })
</script>

<template>
    <div class="text-sm mb-4">
        <h1 class="text-black text-xl">Personal details</h1>
        <p>Enter your personal details below to update your account information.</p>
    </div>
    <!-- @vue-expect-error -->
    <Form :validation-schema="userDetailSchema" method="post" @submit="updateDetail"
        class="max-w-[820px] flex flex-col space-y-4" ref=form v-slot="{ values, errors }">
        <label class="self-center mb-16">
            <Avatar class="w-[180px] h-[180px] bg-gray-300">
                <AvatarImage :src="values.image || avatar || ''" class="object-cover" />
                <AvatarFallback class="text-4xl">{{ abbr(fullName) }}</AvatarFallback>
            </Avatar>
            <input type="file" @change="fileInputHandler" class="sr-only" accept="image/*">
        </label>
        <div class="flex space-x-8">
            <div class="w-1/2">
                <Field name="first_name" v-slot="{ field }">
                    <label class="sr-only" for="lf__first_name">First name</label>
                    <div class="flex gap-2">
                        <IdCard class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="First name" id="lf__first_name"
                                autocomplete="given-name" />
                            <ErrorMessage name="first_name" />
                        </div>
                    </div>
                </Field>
            </div>
            <div class="w-1/2">
                <Field name="last_name" v-slot="{ field }">
                    <label class="sr-only" for="lf__last_name">Last name</label>
                    <div class="flex gap-2">
                        <IdCard class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="Last name" id="lf__last_name"
                                autocomplete="given-name" />
                            <ErrorMessage name="last_name" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <div class="flex space-x-8">
            <div class="w-1/2">
                <Field name="email" v-slot="{ field }">
                    <label class="sr-only" for="lf__email">Email</label>
                    <div class="flex gap-2">
                        <Mail class="mt-3" />
                        <div class="flex-grow">
                            <Input type="email" v-bind="field" placeholder="Email" id="lf__email" autocomplete="email"
                                disabled />
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <Loader class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>