<script lang="ts" setup>
  import type { Category } from '@prisma/client'
  import type { SubmissionContext } from 'vee-validate'
  import { Form, Field, ErrorMessage } from 'vee-validate'

  import { categorySchema } from '~/lib/schema/category'
  import { useProductCategoryStore } from '~/store/productCategory'
  import FileUpload from '~/components/FileUpload.vue'

  interface CategoryFormProps {
    category?: Category | null
  }

  const props = defineProps<CategoryFormProps>()
  const emit = defineEmits(['update-form'])
  const { saveCategory } = useProductCategoryStore()
  const { categoryList } = storeToRefs(useProductCategoryStore())
  const { files, handleFileInput } = useFileStorage()

  const form = ref()
  const isLoading = ref(false)

  const submitHandler = (values: any, { resetForm }: SubmissionContext) => {
    isLoading.value = true

    saveCategory({ ...values, files: files.value })
      .then(() => {
        emit('update-form')
        resetForm()
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const initializeForm = () => {
    form.value?.resetForm()

    if (props.category) {
      form.value?.setFieldValue('id', props.category.id)
      form.value?.setFieldValue('name', props.category.name)
      form.value?.setFieldValue('description', props.category.description || '')
      form.value?.setFieldValue('parent_category', props.category.parent_id || '')
      files.value = []
    }
  }

  watch(props, () => {
    initializeForm()
  }, {
    deep: true,
    immediate: true
  })
</script>

<template>
  <Form class="category__form" action="#" :validation-schema="categorySchema" @submit="submitHandler" ref="form">
    <Field type="hidden" name="id" v-if="props.category" />
    <div class="form__group">
      <label for="cf__name">Name</label>
      <Field type="text" name="name" id="cf__name" autocomplete="name" />
      <ErrorMessage class="input--error" name="name" />
    </div>
    <div class="form__group">
      <label for="cf__description">Description</label>
      <Field name="description" v-slot="{ field }">
        <textarea v-bind="field" id="cf__description" />
      </Field>
      <ErrorMessage class="input--error" name="description" />
    </div>
    <div class="form__group">
      <label class="custom__file">
        <input type="file" @change="handleFileInput" name="file" multiple accept="image/*" />
        <div class="custom__file__text">
          <ol class="custom__file__list">
            <template v-if="files.length > 0">
              <li class="custom__file__list__item" v-for="(file, index) in files">
                <img :src="file.content" :alt="file.name">
                <a href="#" @click.prevent="files.splice(index, 1)"><span class="icon-add"></span></a>
              </li>
            </template>
            <span class="custom__file__list__item" v-else>
              <strong>Select a file</strong>
            </span>
          </ol>
        </div>
      </label>
    </div>
    <div class="form__group">
      <label for="cf__parent_category">Parent category</label>
      <Field name="parent_category" v-slot="{ field }">
        <select v-bind="field" id="cf__parent_category">
          <option value="">Select a parent</option>
          <option :value="category.id" v-for="category in categoryList">{{ category.name }}</option>
        </select>
      </Field>
      <ErrorMessage class="input--error" name="parent_category" />
    </div>
    <div class="text--right">
      <button type="submit" :class="{ 'btn btn__primary': true, 'loading': isLoading }">Save</button>
    </div>
  </Form>
</template>