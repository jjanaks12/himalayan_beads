<script setup lang="ts">
    import { formatDate } from '~/lib/filter';
import { useRoleStore } from '~/store/role'

    useHead({
        title: 'Roles :: Himalayan Beads'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { roleList } = storeToRefs(useRoleStore())
    const { fetchRoles } = useRoleStore()

    const showForm = ref(false)

    onMounted(() => {
        fetchRoles()
    })
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
                            <strong class="title">{{ role.name }}</strong>
                            <em class="subtitle"></em>
                        </td>
                        <td class="text--center">{{ formatDate(role.createdAt) }}</td>
                        <td class="text--right">
                            <a href="#" class="btn btn__info btn--xs">
                                <MdiIcon icon="mdiPencil" size="16" />
                                edit
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>