<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
    import { abbr, showImage } from '~/lib/filters'
    import { companySchema } from '~/lib/schemas/accounts.schema'
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Change company details'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: '*',
        role: 'Admin'
    })

    const form = ref<FormContext | null>(null)
    const isLoading = ref(false)
    const { company, countries } = storeToRefs(useAppStore())
    const { saveCompany } = useAppStore()

    const avatar = computed(() => showImage(company.value?.logo?.name as string))

    const submitHandler = async (values: any) => {
        isLoading.value = true
        await saveCompany(values)
        isLoading.value = false
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

    const init = () => {
        if (form.value) {
            if (company.value) {
                form.value.setFieldValue('id', company.value.id)
                form.value.setFieldValue('name', company.value.name)
                form.value.setFieldValue('email', company.value.email)
                form.value.setFieldValue('phone', company.value.phone)
                form.value.setFieldValue('vat_no', company.value.vat_no)
                form.value.setFieldValue('pan_no', company.value.pan_no)
                form.value.setFieldValue('vat_registered', company.value.vat_registered ?? false)

                if (company.value?.address) {
                    form.value.setFieldValue('address.address', company.value.address.address)
                    form.value.setFieldValue('address.street', company.value.address.street)
                    form.value.setFieldValue('address.state', company.value.address.state)
                    form.value.setFieldValue('address.city', company.value.address.city)
                    form.value.setFieldValue('address.zipCode', company.value.address.zipCode)
                    form.value.setFieldValue('address.countryId', company.value.address.countryId)
                }
            }
        }
    }

    watchEffect(() => {
        if (company.value)
            init()
    })

    onMounted(() => {
        init()
    })
</script>

<template>
    <div class="text-sm mb-4">
        <h1 class="text-black text-xl">Company details</h1>
        <p>Enter your personal details below to update your account information.</p>
    </div>
    <Form class="flex flex-col gap-5" @submit="submitHandler" v-slot="{ values }" ref="form"
        :validation-schema="companySchema">
        <Field name="id" v-slot="{ field }">
            <Input type="hidden" v-bind="field" :model-value="company?.id" />
        </Field>
        <label class="self-center mb-16">
            <Avatar class="w-[180px] h-[180px] bg-gray-300">
                <AvatarImage :src="values.image || avatar || ''" class="object-contain p-3" />
                <AvatarFallback class="text-4xl">{{ abbr(company?.name ?? '') }}</AvatarFallback>
            </Avatar>
            <input type="file" @change="fileInputHandler" class="sr-only" accept="image/*">
        </label>
        <Field name="name" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Label for="cf__name">Name of company</Label>
            <Input v-bind="field" id="cf__name" autocomplete="off" />
            <ErrorMessage name="name" />
        </Field>
        <Field name="email" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Label for="cf__email">Email address</Label>
            <Input type="email" v-bind="field" id="cf__email" autocomplete="off" />
            <ErrorMessage name="email" />
        </Field>
        <fieldset class="flex flex-col gap-4">
            <legend>Company Address</legend>
            <div class="flex gap-4">
                <div class="w-1/2">
                    <Field as="div" name="address.address" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__address">Address</Label>
                        <Input id="cf__address" v-bind="field" max="16" />
                        <ErrorMessage name="address.address" />
                    </Field>
                </div>
                <div class="w-1/2">
                    <Field as="div" name="address.street" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__street">Street name</Label>
                        <Input id="cf__street" v-bind="field" />
                        <ErrorMessage name="address.street" />
                    </Field>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-1/3">
                    <Field as="div" name="address.city" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__city">City</Label>
                        <Input id="cf__city" v-bind="field" max="16" />
                        <ErrorMessage name="address.city" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.zipCode" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__zipCode">Zip code</Label>
                        <Input id="cf__zipCode" v-bind="field" max="16" />
                        <ErrorMessage name="address.zipCode" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.state" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__state">State</Label>
                        <Input id="cf__state" v-bind="field" max="16" />
                        <ErrorMessage name="address.state" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.countryId" v-slot="{ field, handleChange }"
                        class="flex flex-col gap-2">
                        <Label for="cf__country">Country</Label>
                        <Select @change="handleChange" :model-value="field.value" id="cf__country">
                            <SelectTrigger>
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="country in countries" :value="country.id">
                                    {{ country.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <ErrorMessage name="address.countryId" />
                    </Field>
                </div>
            </div>
            <!-- <Field name="address" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                <Label for="cf__address">Address</Label>
                <Input type="text" v-bind="field" id="cf__address" autocomplete="off" />
                <ErrorMessage name="address" />
            </Field> -->
        </fieldset>
        <Field name="phone" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Label for="cf__phone">Phone</Label>
            <Input type="text" v-bind="field" id="cf__phone" autocomplete="off" />
            <ErrorMessage name="phone" />
        </Field>
        <Field name="vat_registered" v-slot="{ handleChange, value }">
            <Label class="flex gap-2">
                <Checkbox :model-value="value" :default-value="false" @update:model-value="handleChange" />
                <span>Is your company registered on VAT?</span>
            </Label>
            <ErrorMessage name="vat_registered" />
        </Field>
        <div class="flex gap-4">
            <div class="w-1/2">
                <Field name="vat_no" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                    <Label for="cf__vat">VAT - Value Added Tax</Label>
                    <Input type="text" v-bind="field" id="cf__vat" autocomplete="off" />
                    <ErrorMessage name="vat_no" />
                </Field>
            </div>
            <div class="w-1/2">
                <Field name="pan_no" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                    <Label for="cf__pan">PAN - Permanent Address Number</Label>
                    <Input type="text" v-bind="field" id="cf__pan" autocomplete="off" />
                    <ErrorMessage name="pan_no" />
                </Field>
            </div>
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>