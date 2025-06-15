<script lang="ts" setup>
    import { useMenu } from './menu'

    const route = useRoute()
    const currentIndex = ref(0)
    const { menus } = useMenu()
</script>

<template>
    <Sidebar variant="sidebar">
        <SidebarHeader class="p-8 bg-white">
            <Brand />
        </SidebarHeader>
        <SidebarContent class="gap-0">
            <SidebarGroup class="bg-[#e6e6e6] p-0">
                <SidebarMenu>
                    <SidebarMenuItem v-for="(menu, index) in menus">
                        <SidebarMenuButton class="h-10" variant="light" asChild>
                            <NuxtLink :to="menu.path">
                                <icon :name="menu.icon" />
                                {{ menu.title }}
                            </NuxtLink>
                        </SidebarMenuButton>
                        <SidebarMenu v-if="menu.sub_menu && menu.sub_menu.length > 0">
                            <SidebarMenuItem v-for="submenu in menu.sub_menu">
                                <SidebarMenuButton class="h-10" variant="light" asChild>
                                    <icon :name="submenu.icon" />
                                    {{ submenu.title }}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <Button>Logout</Button>
        </SidebarFooter>
    </Sidebar>
</template>