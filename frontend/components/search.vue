<script lang="ts" setup>
    import { CrossIcon, SearchIcon } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'

    interface SearchProps {
        placeholder?: string
    }

    const search = defineModel('search', { default: '' })
    withDefaults(defineProps<SearchProps>(), {
        placeholder: 'Search...'
    })

    const formSubmit = (formData: any) => {
        search.value = formData.search
    }
</script>

<template>
    <Form class="max-w-[320px] w-full flex items-center gap-2" @submit="formSubmit">
        <Field name="search" v-slot="{ field }" as="div" class="relative" v-model="search">
            <Input v-bind="field" :placeholder="placeholder" />
            <CrossIcon class="absolute top-1/2 right-2 transform -translate-y-1/2 rotate-45" :size="16"
                @click="search = ''" />
        </Field>
        <Button variant="secondary" size="lg">
            <SearchIcon />
        </Button>
    </Form>
</template>