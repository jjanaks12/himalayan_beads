<script lang="ts" setup>

</script>

<template>
    <Sidebar collapsible="offcanvas" variant="sidebar">
        <SidebarHeader class="pt-16">
            <strong class="greetings font-light block mb-4">
                <span class="text-4xl block font-bold">Heya!</span>
                Welcome to Himalayan Beads
            </strong>
            <ul class="flex gap-2 text-sm text-[#B37557] underline uppercase mb-4">
                <li>
                    <NuxtLink :to="{ name: 'login' }">Signin</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="{ name: 'register' }">Signup</NuxtLink>
                </li>
            </ul>
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