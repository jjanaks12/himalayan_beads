<script lang="ts" setup>
    import { useAuthStore } from '~/store/auth'
    import { useAppStore } from '~/store/app'

    const { menus, currentMenuIndex, subMenuIndex } = storeToRefs(useAppStore())
    const { logout } = useAuthStore()
</script>

<template>
    <Sidebar variant="sidebar">
        <SidebarHeader class="p-8 bg-white text-gray-500">
            <AuthUser />
        </SidebarHeader>
        <SidebarContent class="gap-0">
            <SidebarGroup class="p-0">
                <SidebarMenu>
                    <SidebarMenuItem v-for="(menu, index) in menus">
                        <SidebarMenuButton class="h-10" asChild :is-active="currentMenuIndex == index">
                            <span v-if="menu.sub_menu">
                                <icon :name="menu.icon" />
                                {{ menu.title }}
                            </span>
                            <NuxtLink :to="menu.path" v-else>
                                <icon :name="menu.icon" />
                                {{ menu.title }}
                            </NuxtLink>
                        </SidebarMenuButton>
                        <SidebarMenuSub v-if="menu.sub_menu && menu.sub_menu.length > 0">
                            <SidebarMenuSubItem v-for="(submenu, current) in menu.sub_menu">
                                <SidebarMenuSubButton class="h-10" asChild
                                    :is-active="currentMenuIndex == index && subMenuIndex == current">
                                    <NuxtLink :to="submenu.path">
                                        <icon :name="submenu.icon" />
                                        {{ submenu.title }}
                                    </NuxtLink>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="light" @click="logout">Logout</Button>
        </SidebarFooter>
    </Sidebar>
</template>