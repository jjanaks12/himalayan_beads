<script setup lang="ts">
    import type { Menu } from '~/himalayan_beads'
    import { menus } from '~/lib/adminMenu'

    const { can } = useAuthorization()
    const { signOut } = useAuth()
    const route = useRoute()
    const currentIndex = ref(0)

    const newMenuList = computed(() => {
        const newMenus: Menu[] = []
        for (const menu of menus) {
            let newMenu: Menu

            if (menu.sub_menu && menu.sub_menu.length > 0) {
                const newSubmenus: Menu[] = []
                for (const submenu of menu.sub_menu) {
                    if (can(submenu.permission))
                        newSubmenus.push(submenu)
                }
                if (newSubmenus.length > 0)
                    newMenus.push({ ...menu, sub_menu: newSubmenus })
            } else
                if (can(menu.permission)) {
                    newMenu = { ...menu }
                    newMenus.push(newMenu)
                }
        }
        return newMenus
    })

    const logout = () => {
        signOut()
    }
</script>

<template>
    <aside id="admin-sidebar">
        <div class="sidebar__header">
            <Brand />
            <NuxtLink class="menu__link" to="/">
                <MdiIcon icon="mdiOpenInNew" preserveAspectRatio="xMidYMid meet" />
                To site
            </NuxtLink>
        </div>
        <ul class="admin__main__menu">
            <li v-for="(menu, index) in newMenuList" :class="{
                'has--children': menu.sub_menu && menu.sub_menu.length > 0,
                'show-children': menu.sub_menu?.map(menu => menu.name).includes(route.name as string) || currentIndex == index,
                'active': menu.name == route.name || route.path.includes(menu.path)
            }">
                <nuxt-link :to="menu.path" v-if="!(menu.sub_menu && menu.sub_menu.length > 0)">
                    <MdiIcon :icon="menu.icon" preserveAspectRatio="xMidYMid meet" />
                    {{ menu.title }}
                </nuxt-link>
                <a href="#" @click.prevent="currentIndex = index" v-else>
                    <MdiIcon :icon="menu.icon" preserveAspectRatio="xMidYMid meet" />
                    {{ menu.title }}
                </a>
                <ul v-if="menu.sub_menu && menu.sub_menu?.length > 0">
                    <li v-for="submenu in menu.sub_menu" :class="{ 'active': submenu.name == route.name }">
                        <nuxt-link :to="submenu.path">
                            <MdiIcon :icon="submenu.icon" preserveAspectRatio="xMidYMid meet" />
                            {{ submenu.title }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
        <a href="#" class="menu__link" @click="logout">
            <MdiIcon preserveAspectRatio="xMidYMid meet" icon="mdiLogout" />
            Logout
        </a>
    </aside>
</template>