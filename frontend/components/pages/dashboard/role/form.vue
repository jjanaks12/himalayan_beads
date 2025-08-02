<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import type { Role } from '~/himalayan_beads'
    import { humanize } from '~/lib/filters'
    import { roleSchema } from '~/lib/schemas/role.schema'
    import { usePermissionStore } from '~/store/permission'
    import { useRoleStore } from '~/store/role'

    interface RoleFormProps {
        role?: Role | null
    }

    const props = defineProps<RoleFormProps>()
    const { permissions } = storeToRefs(usePermissionStore())
    const { save } = useRoleStore()
    const emit = defineEmits(['update'])

    const form = ref<FormContext>()
    const isLoading = ref(false)

    const formSubmit = (values: any) => {
        isLoading.value = true
        save(values)
        isLoading.value = false
        emit('update')
    }

    onMounted(() => {
        if (form.value && props.role) {
            form.value.setFieldValue('id', props.role?.id)
            form.value.setFieldValue('name', props.role?.name)
            form.value.setFieldValue('description', props.role?.description || '')

            if (props.role?.permissions && props.role?.permissions.length > 0)
                form.value.setFieldValue('permissions', props.role.permissions.map(permission => permission.id))
        }
    })
</script>

<template>
    <Form :validation-schema="roleSchema" @submit="formSubmit" class="flex flex-col gap-4" ref="form">
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="rf__name">Role name</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Name" id="rf__name" />
                    <ErrorMessage name="name" />
                </div>
            </div>
        </Field>
        <Field name="description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="rf__description">Role description</Label>
            <div class="flex gap-2">
                <div class="flex-grow">
                    <Textarea type="text" v-bind="field" placeholder="Description" id="rf__description" />
                    <ErrorMessage name="description" />
                </div>
            </div>
        </Field>
        <div class="flex flex-wrap gap-4">
            <Field as="div" type="checkbox" name="permissions" v-for="permission in permissions"
                v-slot="{ handleChange, value }" :value="permission.id" class="flex gap-2">
                <Checkbox @update:model-value="handleChange" :id="permission.id"
                    :model-value="value?.includes(permission.id)" />
                <Label :for="permission.id">{{ humanize(permission.name) }}</Label>
            </Field>
            <ErrorMessage name="permissions" />
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>