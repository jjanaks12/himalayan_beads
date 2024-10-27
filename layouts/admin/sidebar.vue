<script setup lang="ts">
    import { menus } from '~/lib/adminMenu'

    const { signOut } = useAuth()
    const route = useRoute()
    const currentIndex = ref(0)

    const logout = () => {
        signOut()
    }

    const updateMenuIndex = () => {
        let index = 0
        const menu = menus.find((menu, i) => menu.path == route.path
            ? i
            : menu.sub_menu && menu.sub_menu.find(submenu => submenu.path == route.path)
                ? i
                : null)

        if (menu)
            index = menus.indexOf(menu)

        currentIndex.value = index
    }

    watch(route, () => {
        updateMenuIndex()
    }, {
        deep: true,
        immediate: true
    })

    onMounted(() => {
        updateMenuIndex()
    })
</script>

<template>
    <aside id="admin-sidebar">
        <div class="sidebar__header">
            <Brand />
            <NuxtLink class="menu__link" to="/">
                <MdiIcon icon="mdiOpenInNew" />
                To site
            </NuxtLink>
        </div>
        <ul class="admin__main__menu">
            <li v-for="(menu, index) in menus" :class="{
                'has--children': menu.sub_menu && menu.sub_menu.length > 0,
                'show-children': index == currentIndex
            }">
                <nuxt-link :to="menu.path" v-if="!(menu.sub_menu && menu.sub_menu.length > 0)">
                    <MdiIcon :icon="menu.icon" />
                    {{ menu.title }}
                </nuxt-link>
                <a href="#" @click.prevent="currentIndex = index" v-else>
                    <MdiIcon :icon="menu.icon" />
                    {{ menu.title }}
                </a>
                <ul v-if="menu.sub_menu && menu.sub_menu?.length > 0">
                    <li v-for="submenu in menu.sub_menu">
                        <nuxt-link :to="submenu.path">
                            <MdiIcon :icon="submenu.icon" />
                            {{ submenu.title }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
        <a href="#" class="menu__link" @click="logout">
            <MdiIcon icon="mdiLogout" />
            Logout
        </a>
    </aside>
</template>