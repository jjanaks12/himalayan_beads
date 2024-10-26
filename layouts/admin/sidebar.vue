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
                <NuxtLink to="/dashboard/playground">Playground</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/dashboard/user">Users</NuxtLink>
            </li>
        </ul>
        <NuxtLink to="/login" class="menu__link">Logout</NuxtLink>
    </aside>
</template>