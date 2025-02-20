import type { Menu } from "~/himalayan_beads"

export const menus: Menu[] = [{
    // id: 1,
    title: 'Dashboard',
    name: 'dashboard',
    path: '/dashboard/',
    icon: 'mdiViewDashboard',
    permission: '*'
}, {
    title: 'Media',
    name: 'dashboard-media',
    icon: 'mdiCart',
    permission: '*',
    path: '/dashboard/media'
}, {
    title: 'Your Order',
    name: 'dashboard-order',
    icon: 'mdiCart',
    permission: ['create_order', 'delete_order'],
    path: '/dashboard/order'
}, {
    // id: 2,
    title: 'Product',
    name: '',
    path: '/dashboard/product/',
    icon: 'mdiFileTree',
    permission: '*',
    sub_menu: [{
        // id: 3,
        title: 'List',
        name: 'dashboard-product',
        path: '/dashboard/product/',
        icon: 'mdiFileTree',
        permission: 'view_product',
        // parent_id: 2,
        sub_menu: [{
            // id: 10,
            title: 'List',
            name: 'dashboard-product-id',
            path: '/dashboard/product/:id',
            icon: 'mdiFileTree',
            permission: 'manage_product',
            // parent_id: 3,
        }]
    }, {
        // id: 4,
        title: 'Category',
        name: 'dashboard-category',
        path: '/dashboard/category/',
        icon: 'mdiShape',
        permission: 'manage_category',
        // parent_id: 2
    },]
}, {
    // id: 5,
    name: 'dashboard-user',
    title: 'Users',
    path: '/dashboard/user/',
    icon: 'mdiAccountGroup',
    permission: 'manage_user'
}, {
    // id: 6,
    title: 'Settings',
    name: '',
    path: '/dashboard/settings/',
    icon: 'mdiCogOutline',
    permission: '*',
    sub_menu: [{
        // id: 7,
        title: 'Roles',
        name: 'dashboard-settings-role',
        path: '/dashboard/settings/role/',
        icon: 'mdiAccountMultiple',
        permission: 'manage_role',
        // parent_id: 6
    }, {
        // id: 8,
        title: 'Permissions',
        name: 'dashboard-settings-permission',
        path: '/dashboard/settings/permission/',
        icon: 'mdiAccountLock',
        permission: 'manage_permission',
        // parent_id: 6
    }]
}, {
    // id: 9,
    title: 'Playground',
    name: 'dashboard-playgroud',
    path: '/dashboard/playground/',
    icon: 'mdiPlayNetwork',
    permission: '*',
    role: 'Admin'
}]