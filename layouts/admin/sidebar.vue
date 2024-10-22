<template>
    <aside id="sidebar">
        <div class="sidebar__header">
            <div class="logo">
                <a href="#">
                    <img src="/images/logo.svg" alt="Himalayan Beads">
                </a>
            </div>
            <NuxtLink class="menu__link" to="/">To site</NuxtLink>
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
        </ul>
        <NuxtLink to="/login" class="menu__link">Logout</NuxtLink>
    </aside>
</template>