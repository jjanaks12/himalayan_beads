<script lang="ts" setup>
    import { XIcon } from 'lucide-vue-next';
    import { useSidebar } from '~/components/ui/sidebar';
    import { useAuthStore } from '~/store/auth'

    const { toggleSidebar } = useSidebar()
    const { isLoggedin } = storeToRefs(useAuthStore())
</script>

<template>
    <Sidebar collapsible="offcanvas" variant="sidebar" position="absolute">
        <SidebarHeader class="pt-4">
            <Button variant="light" @click="toggleSidebar" size="icon" class="ml-auto mb-12">
                <XIcon />
            </Button>
            <template v-if="!isLoggedin">
                <strong class="greetings font-light block mb-4">
                    <span class="text-4xl block font-bold">Heya!</span>
                    Welcome to Himalayan Beads
                </strong>
                <ul class="flex gap-2 text-sm text-[#B37557] underline uppercase mb-4">
                    <template v-if="!isLoggedin">
                        <li>
                            <NuxtLink :to="{ name: 'login' }">Signin</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink :to="{ name: 'register' }">Signup</NuxtLink>
                        </li>
                    </template>
                    <li v-else>
                        <NuxtLink :to="{ name: 'dashboard' }">Dashboard</NuxtLink>
                    </li>
                </ul>
            </template>
            <AuthUser v-else />
        </SidebarHeader>
        <SidebarContent class="gap-0">
            <SidebarGroup class="bg-[#e6e6e6] p-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Track order</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">HB Perks</SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup class="bg-[#e6e6e6] p-0">
                <SidebarGroupLabel class="text-[#b7b5b4] uppercase">More on HB</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Contact Us</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Careers</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Sell on HB</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Advertise on HB</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton class="h-10" variant="light">Terms</SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
    </Sidebar>
</template>