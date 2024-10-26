<script setup lang="ts">
    const { signOut } = useAuth()

    const logout = () => {
        signOut()
    }
</script>

<template>
    <aside id="sidebar">
        <div class="sidebar__header">
            <Brand />
            <NuxtLink class="menu__link" to="/" target="_blank">
                <MdiIcon icon="mdiOpenInNew" />
                To site
            </NuxtLink>
        </div>
        <ul class="main__menu">
            <li>
                <NuxtLink to="/dashboard">Dashboard</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/product">Product</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/category">Product Category</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/user">Users</NuxtLink>
            </li>
            <li>
                <a href="#">Settings</a>
                <ul>
                    <li>
                        <NuxtLink to="/dashboard/settings/role">Roles</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/dashboard/settings/permission">Permission</NuxtLink>
                    </li>
                </ul>
            </li>
            <li>
                <NuxtLink to="/dashboard/playground">Playground</NuxtLink>
            </li>
        </ul>
        <button type="button" class="menu__link" @click="logout">Logout</button>
    </aside>
</template>