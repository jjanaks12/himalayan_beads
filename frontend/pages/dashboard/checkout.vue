<script lang="ts" setup>
    import { useAuthStore } from '~/store/auth'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
    import { userCheckoutInfo } from '~/lib/schemas/user.schema'
    import { CheckIcon, CircleIcon, DotIcon, LoaderIcon, TriangleAlertIcon } from 'lucide-vue-next'
    import { useAppStore } from '~/store/app'
    import { useCartStore } from '~/store/cartStore'

    useHead({
        title: 'Checkout'
    })

    definePageMeta({
        layout: 'admin',
        auth: true,
        authorization: '*',
        role: 'User'
    })

    const { user } = storeToRefs(useAuthStore())
    const { countries } = storeToRefs(useAppStore())
    const { checkout } = useAuthStore()
    const { cartItems } = storeToRefs(useCartStore())

    const saving = ref(false)
    const stepIndex = ref(1)
    const formData = ref<any>({})
    const form = ref<FormContext>()
    const steps = ref([{
        step: 1,
        title: 'Your info',
        name: 'info',
        description: 'We have your this information.',
    }, {
        step: 2,
        title: 'Your payment info',
        name: 'payment',
        // description: 'Choose cash on delivery or online payment to complete your order securely.',
        description: 'Pay with cash when your order arrives at your doorstep securely.',
    }, {
        step: 3,
        name: 'billing_address',
        title: 'Your billing info',
        description: 'Provide correct billing information to process your payment without any issues.',
    }, {
        step: 4,
        title: 'Your shipping info',
        name: 'shipping_address',
        description: 'Enter accurate shipping information to ensure smooth and timely delivery.',
    }])

    const currentStep = computed(() => steps.value[stepIndex.value - 1])

    const onSubmit = (values: any) => {
        if (stepIndex.value == 4) {
            saving.value = true
            formData.value = { ...formData.value, ...values }

            checkout(formData.value)
            saving.value = false
        }
    }

    watchEffect(() => {
        if (form.value?.values.same_as_billing) {
            form.value.setFieldValue('shipping_address.address', form.value?.values?.billing_address?.address)
            form.value.setFieldValue('shipping_address.street', form.value?.values?.billing_address?.street)
            form.value.setFieldValue('shipping_address.city', form.value?.values?.billing_address?.city)
            form.value.setFieldValue('shipping_address.state', form.value?.values?.billing_address?.state)
            form.value.setFieldValue('shipping_address.zipCode', form.value?.values?.billing_address?.zipCode)
            form.value.setFieldValue('shipping_address.countryId', form.value?.values?.billing_address?.countryId)
        }
    })

    onMounted(() => {
        if (form.value)
            form.value.setFieldValue('cartItems', cartItems.value.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price_id: item.price.id
            })))
    })
</script>

<template>
    <Form :validation-schema="userCheckoutInfo" v-slot="{ meta }" ref="form" @submit="onSubmit"
        v-if="cartItems.length > 0">
        <Stepper v-slot="{ isPrevDisabled, nextStep, prevStep }" v-model="stepIndex">
            <div class="w-full">
                <div class="flex w-full flex-start gap-2">
                    <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                        class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                        <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                            class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />

                        <StepperTrigger as-child>
                            <Button :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                                size="icon" class="z-10 rounded-full shrink-0"
                                :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                                :disabled="state !== 'completed' && !meta.valid">
                                <CheckIcon v-if="state === 'completed'" class="size-5" />
                                <CircleIcon v-if="state === 'active'" />
                                <DotIcon v-if="state === 'inactive'" />
                            </Button>
                        </StepperTrigger>
                    </StepperItem>
                </div>
                <div class="flex flex-col gap-4 py-8">
                    <div class="text-center text-gray-300 mb-8">
                        <h2 class="text-2xl text-gray-500">{{ currentStep.title }}</h2>
                        <p>{{ currentStep.description }}</p>
                    </div>
                    <dl class="text-sm" v-show="stepIndex === 1">
                        <dt class="font-semibold">Name:</dt>
                        <dd>{{ [user?.first_name, user?.last_name].join(' ') }}</dd>
                        <dt class="font-semibold">Email:</dt>
                        <dd>{{ user?.email }}</dd>
                    </dl>
                    <div class="flex flex-col gap-4" v-show="stepIndex === 2">
                        <Field as="div" name="payment.cash_on_delivery" v-slot="{ field, handleChange }"
                            class="flex flex-col gap-2 border border-dashed p-3 rounded mb-12" :unchecked-value="false"
                            :value="true">
                            <div class="flex gap-2">
                                <Label for="pf__cash_on_delivery">Cash on delivery</Label>
                                <Checkbox id="pf__cash_on_delivery" :model-value="field.value"
                                    @update:model-value="handleChange" />
                            </div>
                            <div class="text-gray-300 text-xs">
                                <p>Pay with cash upon delivery for a simple, secure shopping experience.</p>
                                <!-- <p v-if="values.cash_on_delivery">Pay with cash upon delivery for a simple, secure shopping experience.</p>
                                <p v-else>Make a secure online payment using your preferred payment method now.</p> -->
                            </div>
                        </Field>
                        <!-- <template v-if="!values.cash_on_delivery">
                            <Field as="div" name="name_on_card" v-slot="{ field }" class="flex flex-col gap-2">
                                <Label for="pf__name_on_card">Name on card</Label>
                                <Input id="pf__name_on_card" v-bind="field" />
                                <ErrorMessage name="name_on_card" />
                            </Field>
                            <Field as="div" name="card_number" class="flex flex-col gap-2" v-slot="{ field, value }">
                                <Label for="pf__card_number">Card number</Label>
                                <div class="flex items-center gap-2">
                                    <Input id="pf__card_number" v-bind="field" max="16" />
                                    <Badge>{{ value?.length || 0 }}</Badge>
                                </div>
                                <ErrorMessage name="card_number" />
                            </Field>
                            <div class="flex gap-4">
                                <div class="w-1/3">
                                    <Field as="div" name="month" v-slot="{ field }" class="flex flex-col gap-2">
                                        <Label for="pf__month">Month</Label>
                                        <Input id="pf__month" v-bind="field" />
                                        <ErrorMessage name="month" />

                                    </Field>
                                </div>
                                <div class="w-1/3">
                                    <Field as="div" name="year" v-slot="{ field }" class="flex flex-col gap-2">
                                        <Label for="pf__year">Year</Label>
                                        <Input id="pf__year" v-bind="field" />
                                        <ErrorMessage name="year" />
                                    </Field>
                                </div>
                                <div class="w-1/3">
                                    <Field as="div" name="card_cvc" v-slot="{ field }" class="flex flex-col gap-2">
                                        <Label for="pf__card_cvc">CVC</Label>
                                        <Input id="pf__card_cvc" v-bind="field" />
                                        <ErrorMessage name="card_cvc" />
                                    </Field>
                                </div>
                            </div>
                        </template> -->
                    </div>
                    <div class="flex flex-col gap-4" v-show="stepIndex === 3">
                        <div class="flex gap-4">
                            <div class="w-1/2">
                                <Field as="div" name="billing_address.address" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="baf__address">Address</Label>
                                    <Input id="baf__address" v-bind="field" max="16" />
                                    <ErrorMessage name="billing_address.address" />
                                </Field>
                            </div>
                            <div class="w-1/2">
                                <Field as="div" name="billing_address.street" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="baf__street">Street name</Label>
                                    <Input id="baf__street" v-bind="field" />
                                    <ErrorMessage name="billing_address.street" />
                                </Field>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-1/3">
                                <Field as="div" name="billing_address.city" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="baf__city">City</Label>
                                    <Input id="baf__city" v-bind="field" max="16" />
                                    <ErrorMessage name="billing_address.city" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="billing_address.zipCode" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="baf__zipCode">Zip code</Label>
                                    <Input id="baf__zipCode" v-bind="field" max="16" />
                                    <ErrorMessage name="billing_address.zipCode" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="billing_address.state" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="baf__state">State</Label>
                                    <Input id="baf__state" v-bind="field" max="16" />
                                    <ErrorMessage name="billing_address.state" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="billing_address.countryId" v-slot="{ field, handleChange }"
                                    class="flex flex-col gap-2">
                                    <Label>Country</Label>
                                    <Select @change="handleChange" :model-value="field.value">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="country in countries" :value="country.id">
                                                {{ country.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage name="billing_address.countryId" />
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4" v-show="stepIndex === 4">
                        <Field as="div" name="same_as_billing" v-slot="{ field, handleChange }"
                            class="flex flex-col gap-2 border border-dashed p-3 rounded mb-12" :unchecked-value="false"
                            :value="false">
                            <div class="flex gap-2">
                                <Label for="saf__same_as_billing">Same as billing</Label>
                                <Checkbox id="saf__same_as_billing" :model-value="field.value"
                                    @update:model-value="handleChange" />
                            </div>
                            <div class="text-gray-300 text-xs">
                                <p>Check this box if shipping address is same as billing info.</p>
                            </div>
                        </Field>
                        <div class="flex gap-4">
                            <div class="w-1/2">
                                <Field as="div" name="shipping_address.address" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="saf__address">Address</Label>
                                    <Input id="saf__address" v-bind="field" max="16" />
                                    <ErrorMessage name="shipping_address.address" />
                                </Field>
                            </div>
                            <div class="w-1/2">
                                <Field as="div" name="shipping_address.street" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="saf__street">Street name</Label>
                                    <Input id="saf__street" v-bind="field" />
                                    <ErrorMessage name="shipping_address.street" />
                                </Field>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="w-1/3">
                                <Field as="div" name="shipping_address.city" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="saf__city">City</Label>
                                    <Input id="saf__city" v-bind="field" max="16" />
                                    <ErrorMessage name="shipping_address.city" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="shipping_address.zipCode" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="saf__zipCode">Zip code</Label>
                                    <Input id="saf__zipCode" v-bind="field" max="16" />
                                    <ErrorMessage name="shipping_address.zipCode" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="shipping_address.state" v-slot="{ field }"
                                    class="flex flex-col gap-2">
                                    <Label for="saf__state">State</Label>
                                    <Input id="saf__state" v-bind="field" max="16" />
                                    <ErrorMessage name="shipping_address.state" />
                                </Field>
                            </div>
                            <div class="w-1/3">
                                <Field as="div" name="shipping_address.countryId" v-slot="{ field, handleChange }"
                                    class="flex flex-col gap-2">
                                    <Label>Country</Label>
                                    <Select :model-value="field.value" @change="handleChange">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem v-for="country in countries" :value="country.id">
                                                {{ country.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <ErrorMessage name="shipping_address.countryId" />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <Button type="button" :disabled="isPrevDisabled" variant="outline" @click="prevStep()">
                        Back
                    </Button>
                    <div class="flex items-center gap-3">
                        <Button v-if="stepIndex !== steps.length" :type="meta.valid ? 'button' : 'submit'"
                            @click="nextStep">
                            Next
                        </Button>
                        <Button v-if="stepIndex === steps.length" type="submit" :disabled="saving">
                            <LoaderIcon class="animate-spin relative" v-if="saving" />
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </Stepper>
    </Form>
    <Alert variant="warn" v-else>
        <TriangleAlertIcon />
        <AlertTitle>No items in the cart.</AlertTitle>
        <AlertDescription>
            <span>
                Please go back to <Button variant="link" size="link" as-child>
                    <NuxtLink to="/products">products</NuxtLink>
                </Button> and fill cart before checkout.
            </span>
        </AlertDescription>
    </Alert>
</template>