<script lang="ts" setup>
    import { useMenu } from './menu'

    const route = useRoute()
    const currentIndex = ref(0)
    const { menus } = useMenu()
</script>

<template>
    <Sidebar variant="sidebar">
        <SidebarHeader class="p-8 bg-white text-gray-500">
            <AuthUser />
        </SidebarHeader>
        <SidebarContent class="gap-0">
            <SidebarGroup class="bg-[#e5e5e5] p-0">
                <SidebarMenu>
                    <SidebarMenuItem v-for="(menu, index) in menus">
                        <SidebarMenuButton class="h-10" variant="light" asChild>
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
                            <SidebarMenuSubItem v-for="submenu in menu.sub_menu">
                                <SidebarMenuSubButton class="h-10" asChild>
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
            <Button variant="light">Logout</Button>
        </SidebarFooter>
    </Sidebar>
</template>