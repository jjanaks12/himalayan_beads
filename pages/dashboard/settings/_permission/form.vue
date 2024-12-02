<script lang="ts" setup>
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { permissionSchema } from '~/lib/schema/settings.schema'

    const isLoading = ref(false)

    const onSubmit = () => {

    }
</script>

<template>
    <Form class="form" :validation-schema="permissionSchema" @submit="onSubmit">
        <div class="form__group">
            <label for="pf__name">Name</label>
            <Field name="name" type="text" id="pf__name" />
            <ErrorMessage class="input--error" name="name" />
        </div>
        <div class="form__group">
            <label for="pf__description">Description</label>
            <Field name="description" v-slot="{ field }">
                <textarea v-bind="field" id="pf__description" />
            </Field>
            <ErrorMessage class="input--error" name="description" />
        </div>
        <div class="text--right">
            <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Save</button>
        </div>
    </Form>
</template>