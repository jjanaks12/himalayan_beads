import type { PrismaClient } from "@prisma/client"

export const roleSeed = async (prisma: PrismaClient) => {
    /* User role */
    await prisma.role.create({
        data: {
            name: 'User',
            publish: true
        }
    })

    /* Admin role */
    await prisma.role.create({
        data: {
            name: 'Admin',
            publish: true,
            permissions: {
                create: [{
                    name: 'create_user'
                }, {
                    name: 'update_user'
                }, {
                    name: 'view_user'
                }, {
                    name: 'delete_user'
                }, {
                    name: 'create_product'
                }, {
                    name: 'update_product'
                }, {
                    name: 'view_product'
                }, {
                    name: 'delete_product'
                }, {
                    name: 'create_category'
                }, {
                    name: 'update_category'
                }, {
                    name: 'view_category'
                }, {
                    name: 'delete_category'
                }, {
                    name: 'create_role'
                }, {
                    name: 'update_role'
                }, {
                    name: 'view_role'
                }, {
                    name: 'delete_role'
                }, {
                    name: 'create_permission'
                }, {
                    name: 'update_permission'
                }, {
                    name: 'view_permission'
                }, {
                    name: 'delete_permission'
                }, {
                    name: 'create_order'
                }, {
                    name: 'update_order'
                }, {
                    name: 'view_order'
                }, {
                    name: 'delete_order'
                }]
            }
        }
    })
}