import type { Menu } from "~/himalayan_beads"

export const useMenu = () => {
    const { can } = useAuthorization()

    const route = useRoute()

    const menuList = ref<Menu[]>([{
        // id: 1,
        title: 'Dashboard',
        name: 'dashboards',
        path: '/dashboard/',
        icon: 'LayoutDashboardIcon',
        permission: '*'
    }, {
        title: 'Media',
        name: 'medias',
        icon: 'ShoppingBag',
        permission: 'manage_media',
        path: '/dashboard/medias'
    }, {
        title: 'Your Order',
        name: 'myOrders',
        icon: 'CreditCard',
        permission: ['create_order', 'delete_order'],
        path: '/dashboard/myOrders'
    }, {
        // id: 2,
        title: 'Product',
        name: 'products',
        path: '/dashboard/products/',
        icon: 'Boxes',
        permission: '*',
        sub_menu: [{
            // id: 3,
            title: 'List',
            name: 'products',
            path: '/dashboard/products/',
            icon: 'ListTree',
            permission: 'view_product',
            // parent_id: 2,
            sub_menu: [{
                // id: 10,
                title: 'List',
                name: 'products_list_id',
                path: '/dashboard/products/:id',
                icon: 'ListTree',
                permission: 'manage_product',
                // parent_id: 3,
            }]
        }, {
            // id: 4,
            title: 'Category',
            name: 'products_categories',
            path: '/dashboard/products/categories/',
            icon: 'Shapes',
            permission: 'manage_category',
            // parent_id: 2
        }, {
            // id: 4,
            title: 'Orders',
            name: 'products_orders',
            path: '/dashboard/products/orders/',
            icon: 'BaggageClaim',
            permission: ['view_order', 'update_order'],
            // parent_id: 2
        },]
    }, {
        // id: 5,
        name: 'users',
        title: 'Users',
        path: '/dashboard/users/',
        icon: 'Users',
        permission: 'manage_user'
    }, {
        // id: 6,
        title: 'Settings',
        name: 'settings',
        path: '/dashboard/settings/',
        icon: 'Settings',
        permission: '*',
        sub_menu: [{
            // id: 7,
            title: 'Roles',
            name: 'settings_roles',
            path: '/dashboard/settings/roles/',
            icon: 'UserRoundCog',
            permission: 'manage_role',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'Permissions',
            name: 'settings_permissions',
            path: '/dashboard/settings/permissions/',
            icon: 'UserLock',
            permission: 'manage_permission',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'User detail',
            name: 'settings_user_detail',
            path: '/dashboard/settings/user_detail/',
            icon: 'UserPenIcon',
            permission: '*',
            // parent_id: 6
        }, {
            // id: 8,
            title: 'Change password',
            name: 'settings_change_password',
            path: '/dashboard/settings/change_password/',
            icon: 'KeyRoundIcon',
            permission: '',
            // parent_id: 6
        }]
    }, {
        // id: 9,
        title: 'Playground',
        name: 'playground',
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
    const pages = computed(() => (route.name as string).split('-'))
    const currentMenuIndex = computed(() => menus.value.findIndex(menu => pages.value.length == 1 ? true : menu.name === pages.value[1]))
    const subMenuIndex = computed(() => menus.value[currentMenuIndex.value]?.sub_menu && menus.value[currentMenuIndex.value]?.sub_menu?.findIndex(subMenu => pages.value[2] ? subMenu.name.includes(pages.value[2]) : true))

    return {
        menus,
        currentMenuIndex, subMenuIndex
    }
}