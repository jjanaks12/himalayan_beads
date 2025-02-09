<script lang="ts" setup>
  import { formatDate } from '~/lib/filter'
  import { useUserStore } from '~/store/user'

  useHead({
    title: 'Users :: Himalayan Beads'
  })

  definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'authorization'],
    permission: 'view_user'
  })

  const { userList } = storeToRefs(useUserStore())
  const { fetchUser } = useUserStore()

  onMounted(async () => {
    await fetchUser()
  })
</script>

<template>
  <section class="datatable__section">
    <header class="datatable__header">
      <div class="datatable__header__holder">
        <h1>Users</h1>
      </div>
    </header>
    <div class="datatable__body">
      <table>
        <thead>
          <tr>
            <th></th>
            <th class="text--left">Name</th>
            <th>Created at</th>
            <th>Email verified</th>
            <th class="text--right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList">
            <td class="sn">{{ index + 1 }}</td>
            <td>
              <div class="wrap">
                <figure class="image" v-if="user.image">
                  <img :src="user?.image.url as string" :alt="user.name as string">
                </figure>
                <div class="holder">
                  <NuxtLink :to="'/dashboard/user/' + user.id" class="title">{{ user.name }}</NuxtLink>
                  <em class="subtitle">{{ user.email }}</em>
                  <span class="badge badge--info">{{ user.role.name }}</span>
                </div>
              </div>
            </td>
            <td class="text--center">{{ formatDate(user.createdAt) }}</td>
            <td class="text--center">
              <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiShieldCheck" class="text--success" v-if="user.emailVerified != null" />
            </td>
            <td class="text--right">
              <a href="#" class="btn btn--xs btn__danger">change role</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
