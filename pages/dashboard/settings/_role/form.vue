<script setup lang="ts">
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { roleSchema } from '~/lib/schema/settings.schema'
    import { usePermissionStore } from '~/store/permission'

    interface RoleFormProps {
        role?: any | null
    }

    const props = defineProps<RoleFormProps>()
    const emit = defineEmits(['update'])
    const { permissionList } = storeToRefs(usePermissionStore())
    const { fetch } = usePermissionStore()

    const isLoading = ref(false)
    const form = ref()

    const onSubmit = (values: any) => {
        isLoading.value = true

        $fetch(`/api/role`, {
            method: 'POST',
            body: { ...values }
        })
            .then(() => {
                emit('update')
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const initializeForm = () => {
        form.value?.resetForm()

        if (props.role) {
            form.value?.setFieldValue('id', props.role?.id)
            form.value?.setFieldValue('name', props.role.name)
            form.value?.setFieldValue('description', props.role.description || '')
            form.value?.setFieldValue('permissions', props.role.permissions.map((permission: any) => permission.id))
        }
    }

    onMounted(() => {
        if (permissionList.value.length == 0)
            fetch()

        form.value?.resetForm()
    })

    watch(props, () => {
        initializeForm()
    }, {
        deep: true,
        immediate: true
    })
</script>

<template>
    <Form class="form" :validation-schema="roleSchema" @submit="onSubmit" ref="form">
        <div class="form__group">
            <label for="rf__name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" class="input--error" />
        </div>
        <div class="form__group">
            <label for="rf__description">Description</label>
            <Field name="description" v-slot="{ field }">
                <textarea v-bind="field" id="rf__description" />
            </Field>
            <ErrorMessage name="description" class="input--error" />
        </div>
        <div class="form__group">
            <strong class="label">Permissions</strong>
            <div class="custom__checkbox__group">
                <label class="custom__checkbox" v-for="permission in permissionList">
                    <Field name="permissions" type="checkbox" v-slot="{ field }" :value="permission.id">
                        <input type="checkbox" :value="permission.id" v-bind="field" />
                    </Field>
                    <span class="custom__checkbox__text">{{ permission.name }}</span>
                </label>
            </div>
            <ErrorMessage name="permissions" class="input--error" />
        </div>
        <div class="text--right">
            <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Save</button>
        </div>
    </Form>
</template>