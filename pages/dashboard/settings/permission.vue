<script setup lang="ts">
  import { formatDate } from '~/lib/filter'
  import { usePermissionStore } from '~/store/permission'

  useHead({
    title: 'Permissions :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })

  const { permissionList } = storeToRefs(usePermissionStore())
  const { fetchUser } = usePermissionStore()
  const showForm = ref(false)

  onMounted(() => {
    fetchUser()
  })
</script>

<template>

  <section class="datatable__section">
    <header class="datatable__header">
      <div class="datatable__header__holder">
        <h1>Permissions</h1>
      </div>
      <div class="datatable__header__action">
        <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
          <span class="prepend-icon icon-add"></span>
          Add Permission
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
          <tr v-for="(permission, index) in permissionList">
            <td class="sn">{{ index + 1 }}</td>
            <td>{{ permission.name }}</td>
            <td>{{ formatDate(permission.createdAt) }}</td>
            <td class="text--right"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>