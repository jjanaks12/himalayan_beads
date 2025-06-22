<script lang="ts" setup>
    import { SearchIcon } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'
</script>

<template>
    <Form class="max-w-[320px] w-full flex items-center gap-2">
        <Field name="search" v-slot="{ field }">
            <Input v-bind="field" placeholder="Search users" />
        </Field>
        <Button variant="secondary" size="lg">
            <SearchIcon />
        </Button>
    </Form>
</template>