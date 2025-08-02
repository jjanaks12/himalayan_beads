<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { ErrorMessage, Form, Field, type FormContext } from 'vee-validate'

    import type { User } from '~/himalayan_beads'
    import { assignRoleSchema } from '~/lib/schemas/role.schema'
    import { useRoleStore } from '~/store/role'

    interface RoleFormProps {
        user?: User | null
    }

    const props = defineProps<RoleFormProps>()
    const form = ref<FormContext>()
    const emit = defineEmits(['update'])
    const { assignUserRole } = useRoleStore()
    const { roles } = storeToRefs(useRoleStore())

    const isLoading = ref(false)

    const formSubmit = async (values: any) => {
        isLoading.value = true
        console.log(values);

        await assignUserRole(values)
        isLoading.value = false
        emit('update')
    }

    watchEffect(() => {
        if (form.value) {
            form.value.setValues({
                user_id: props.user?.id,
                role_id: props.user?.role.id
            })
        }
    })
</script>

<template>
    <Form :validation-schema="assignRoleSchema" @submit="formSubmit" class="flex flex-col gap-4" v-slot="{ values }"
        ref="form">
        <Field type="hidden" name="user_id" :value="user?.id" />
        <Field name="role_id" v-slot="{ handleChange }">
            <Select @update:model-value="handleChange" :default-value="user?.role.id">
                <SelectTrigger>
                    <SelectValue placeholder="Change role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="role in roles" :value="role.id">{{ role.name }}</SelectItem>
                </SelectContent>
            </Select>
            <ErrorMessage name="role_id" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>