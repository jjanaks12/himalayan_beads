<script lang="ts" setup>
  import type { Category } from '@prisma/client'

  import { formatDate } from '~/lib/filter'
  import { useProductCategoryStore } from '~/store/productCategory'

  import Modal from '~/components/Modal.vue'
  import CategoryForm from '~/components/product/category/form.vue'
  import Alert from '~/components/Alert.vue'

  useHead({
    title: 'Category :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })

  const { categoryList } = storeToRefs(useProductCategoryStore())
  const { fetchCategory } = useProductCategoryStore()

  const showForm = ref(false)
  const isDeleting = ref(false)
  const toggleAccordion = ref<any>({})
  const editCategory = ref<null | Category>(null)
  const deletingCategory = ref<null | Category>(null)

  const deleteCategory = () => {
    isDeleting.value = true

    $fetch(`/api/category/${deletingCategory.value?.id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        deletingCategory.value = null
        fetchCategory()
      })
      .finally(() => {
        isDeleting.value = false
      })
  }

  const showDeleteAlert = computed(() => deletingCategory.value != null)

  watch(editCategory, () => {
    if (editCategory.value)
      showForm.value = true
    else
      showForm.value = false
  })

  onMounted(() => {
    fetchCategory()
  })
</script>

<template>
  <section class="datatable__section">
    <header class="datatable__header">
      <div class="datatable__header__holder">
        <h1>Product category</h1>
      </div>
      <div class="datatable__header__action">
        <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
          <span class="prepend-icon icon-add"></span>
          Add Category
        </a>
      </div>
    </header>
    <div class="datatable__body">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="text--left">Name</th>
            <th>Created at</th>
            <th class="text--right">Action</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(category, index) in categoryList" :key="category.id">
            <tr>
              <td class="sn">{{ index + 1 }}</td>
              <td>
                <div class="wrap">
                  <figure class="image" v-if="category.image">
                    <img :src="category.image?.url || ''" :alt="category.name">
                  </figure>
                  <div class="holder">
                    <strong class="title">{{ category.name }}</strong>
                  </div>
                </div>
              </td>
              <td class="text--center nowrap">{{ formatDate(category.createdAt) }}</td>
              <td class="text--right nowrap">
                <a class="btn btn--xs btn__info" href="#" @click.prevent="editCategory = category">
                  <span class="prepend-icon icon-edit"></span>
                  Edit
                </a>
                <a class="btn btn--xs btn__danger" href="#" @click.prevent="deletingCategory = category">
                  <span class="prepend-icon icon-trash"></span>
                  Delete
                </a>
                <a href="#" class="btn btn--xs btn__primary btn--outline" v-if="category?.predecessor.length > 0"
                  @click.prevent="toggleAccordion[category.id] = toggleAccordion[category.id] ? !toggleAccordion[category.id] : true">
                  <span class="icon-caret-d" v-if="toggleAccordion[category.id]"></span>
                  <span class="icon-caret-t" v-else></span>
                </a>
              </td>
            </tr>
            <tr v-if="category?.predecessor.length > 0 && toggleAccordion[category?.id]">
              <td colspan="4" class="no--spacing">
                <table class="subtable">
                  <tbody>
                    <tr v-for="(subCategory, counter) in category.predecessor">
                      <td class="sn">{{ index + 1 }}.{{ counter + 1 }}</td>
                      <td class="text--center">{{ subCategory.name }}</td>
                      <td>{{ formatDate(subCategory.createdAt) }}</td>
                      <td class="text--right">
                        <a class="btn btn--xs btn__info" href="#" @click.prevent="editCategory = subCategory">
                          <span class="prepend-icon icon-edit"></span>
                          Edit
                        </a>
                        <a class="btn btn--xs btn__danger" href="#" @click.prevent="deletingCategory = subCategory">
                          <span class="prepend-icon icon-trash"></span>
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <Modal v-model:show="showForm" @modal:close="editCategory = null">
      <CategoryForm :category="editCategory || null" @update-form="() => {
        showForm = false

        fetchCategory()
      }" />
    </Modal>
    <Alert title="Are you sure you want delete?" v-model:show="showDeleteAlert" v-model:loading="isDeleting" :onCancel="() => {
      deletingCategory = null
    }" :onConfirm="deleteCategory">
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quo, explicabo necessitatibus laboriosam a
        voluptatem hic ratione eius excepturi doloremque quidem odit eaque blanditiis illo obcaecati. Dicta adipisci
        accusantium quidem.</p>
    </Alert>
  </section>
</template>
