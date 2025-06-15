import type { Menu } from "~/himalayan_beads"

export const useMenu = () => {
    const { can } = useAuthorization()

    const menuList = ref<Menu[]>([{
        // id: 1,
        title: 'Dashboard',
        name: 'dashboard',
        path: '/dashboard/',
        icon: 'LayoutDashboardIcon',
        permission: '*'
    }, {
        title: 'Media',
        name: 'dashboard-media',
        icon: 'ShoppingBag',
        permission: '*',
        path: '/dashboard/medias'
    }, {
        title: 'Your Order',
        name: 'dashboard-order',
        icon: 'CreditCard',
        permission: ['create_order', 'delete_order'],
        path: '/dashboard/myOrders'
    }, {
        // id: 2,
        title: 'Product',
        name: '',
        path: '/dashboard/products/',
        icon: 'Boxes',
        permission: '*',
        sub_menu: [{
            // id: 3,
            title: 'List',
            name: 'dashboard-product',
            path: '/dashboard/products/',
            icon: 'ListTree',
            permission: 'view_product',
            // parent_id: 2,
            sub_menu: [{
                // id: 10,
                title: 'List',
                name: 'dashboard-product-id',
                path: '/dashboard/products/:id',
                icon: 'ListTree',
                permission: 'manage_product',
                // parent_id: 3,
            }]
        }, {
            // id: 4,
            title: 'Category',
            name: 'dashboard-category',
            path: '/dashboard/categories/',
            icon: 'Shapes',
            permission: 'manage_category',
            // parent_id: 2
        }, {
            // id: 4,
            title: 'Orders',
            name: 'dashboard-order',
            path: '/dashboard/orders/',
            icon: 'BaggageClaim',
            permission: ['view_order', 'update_order'],
            // parent_id: 2
        },]
    }, {
        // id: 5,
        name: 'dashboard-user',
        title: 'Users',
        path: '/dashboard/users/',
        icon: 'Users',
        permission: 'manage_user'
    }, {
        // id: 6,
        title: 'Settings',
        name: '',
        path: '/dashboard/settings/',
        icon: 'Settings',
        permission: '*',
        sub_menu: [{
            // id: 7,
            title: 'Roles',
            name: 'dashboard-settings-role',
            path: '/dashboard/settings/roles/',
            icon: 'UserRoundCog',
            permission: 'manage_role',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'Permissions',
            name: 'dashboard-settings-permission',
            path: '/dashboard/settings/permissions/',
            icon: 'UserLock',
            permission: 'manage_permission',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'User detail',
            name: 'dashboard-settings-user_detail',
            path: '/dashboard/settings/user_detail/',
            icon: 'UserPenIcon',
            permission: '*',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'Change password',
            name: 'dashboard-settings-change_password',
            path: '/dashboard/settings/change_password/',
            icon: 'KeyRoundIcon',
            permission: '*',
            // parent_id: 6
        }]
    }, {
        // id: 9,
        title: 'Playground',
        name: 'dashboard-playgroud',
        path: '/dashboard/playground/',
        icon: 'ListVideo',
        permission: '*',
        role: 'Admin'
    }])

    const menus = computed(() => {
        const newMenus: Menu[] = []
        for (const menu of menuList.value) {
            let newMenu: Menu

            if (menu.sub_menu && menu.sub_menu.length > 0) {
                const newSubmenus: Menu[] = []
                for (const submenu of menu.sub_menu) {
                    if (can(submenu.permission, submenu.role))
                        newSubmenus.push(submenu)
                }
                if (newSubmenus.length > 0)
                    newMenus.push({ ...menu, sub_menu: newSubmenus })
            } else
                if (can(menu.permission, menu.role)) {
                    newMenu = { ...menu }
                    newMenus.push(newMenu)
                }
        }
        return newMenus
    })

    return { menus }
}