import * as Icons from '@mdi/js'

type Menu = {
    title: string
    path: string
    icon: keyof typeof Icons
    permission: string | string[]
    sub_menu?: Menu[]
}

export const menus: Menu[] = [{
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'mdiViewDashboard',
    permission: '*'
}, {
    title: 'Product',
    path: '/dashboard/product',
    icon: 'mdiFileTree',
    permission: 'manage_product'
}, {
    title: 'Category',
    path: '/dashboard/category',
    icon: 'mdiShape',
    permission: 'manage_category'
}, {
    title: 'Users',
    path: '/dashboard/user',
    icon: 'mdiAccountGroup',
    permission: 'manage_user'
}, {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: 'mdiCogOutline',
    permission: '*',
    sub_menu: [{
        title: 'Roles',
        path: '/dashboard/settings/role',
        icon: 'mdiAccountMultiple',
        permission: 'manage_roles'
    }, {
        title: 'Permissions',
        path: '/dashboard/settings/permission',
        icon: 'mdiAccountLock',
        permission: 'manage_permission'
    }]
}, {
    title: 'Playground',
    path: '/dashboard/playground',
    icon: 'mdiPlayNetwork',
    permission: '*'
}]