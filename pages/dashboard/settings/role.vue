<script setup lang="ts">
    import { formatDate } from '~/lib/filter'
    import { useRoleStore } from '~/store/role'

    import RoleForm from '@/pages/dashboard/settings/_role/form.vue'

    useHead({
        title: 'Roles :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: ['auth', 'authorization'],
        permission: 'view_role'
    })

    const { roleList } = storeToRefs(useRoleStore())
    const { fetchRoles } = useRoleStore()

    const showForm = ref(false)
    const editRole = ref(null)

    onMounted(() => {
        fetchRoles()
    })

    watch(editRole, () => {
        if (editRole.value)
            showForm.value = true
    }, { deep: true })
</script>

<template>
    <section class="datatable__section">
        <header class="datatable__header">
            <div class="datatable__header__holder">
                <h1>Roles</h1>
            </div>
            <div class="datatable__header__action">
                <a class="btn btn__primary" href="#" @click.prevent="showForm = true">
                    <span class="prepend-icon icon-add"></span>
                    Add Roles
                </a>
            </div>
        </header>
        <div class="datatable__body">
            <table>
                <thead>
                    <tr>
                        <th class="sn"></th>
                        <th class="text--left">Name</th>
                        <th>Created at</th>
                        <th class="text--right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(role, index) in roleList">
                        <td class="sn">{{ index + 1 }}</td>
                        <td>
                            <div class="wrap">
                                <div class="holder">
                                    <strong class="title">{{ role.name }}</strong>
                                    <div class="badge__group">
                                        <span class="badge badge--info" v-for="permission in role.permissions">{{
                                            permission.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text--center">{{ formatDate(role.createdAt) }}</td>
                        <td class="text--right">
                            <ThemeButton size="xl" @click="editRole = role" persmission="update_role">
                                <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiPencil" size="16" />
                                edit
                            </ThemeButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <Modal :show="showForm" size="xl" @modal:close="() => {
        showForm = false
        editRole = null
    }">
        <RoleForm :role="editRole" @update="() => {
            showForm = false
            editRole = null

            fetchRoles()
        }" />
    </Modal>
</template>