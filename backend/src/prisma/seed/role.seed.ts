import bcript from 'bcrypt'
import type { PrismaClient } from "@prisma/client"

export const roleSeed = async (prisma: PrismaClient) => {
    const company = await prisma.company.create({
        data: {
            name: 'Himalayan Beads',
            email: 'info@himalayanbeads.com',
            phone: '23456',
            vat_registered: false,
            pan_no: '1234'
        }
    })

    const create_user = await prisma.permission.create({
        data: {
            name: 'create_user'
        }
    })
    const update_user = await prisma.permission.create({
        data: {
            name: 'update_user'
        }
    })
    const view_user = await prisma.permission.create({
        data: {
            name: 'view_user'
        }
    })
    const delete_user = await prisma.permission.create({
        data: {
            name: 'delete_user'
        }
    })
    const create_product = await prisma.permission.create({
        data: {
            name: 'create_product'
        }
    })
    const update_product = await prisma.permission.create({
        data: {
            name: 'update_product'
        }
    })
    const view_product = await prisma.permission.create({
        data: {
            name: 'view_product'
        }
    })
    const delete_product = await prisma.permission.create({
        data: {
            name: 'delete_product'
        }
    })
    const create_category = await prisma.permission.create({
        data: {
            name: 'create_category'
        }
    })
    const update_category = await prisma.permission.create({
        data: {
            name: 'update_category'
        }
    })
    const view_category = await prisma.permission.create({
        data: {
            name: 'view_category'
        }
    })
    const delete_category = await prisma.permission.create({
        data: {
            name: 'delete_category'
        }
    })
    const create_role = await prisma.permission.create({
        data: {
            name: 'create_role'
        }
    })
    const update_role = await prisma.permission.create({
        data: {
            name: 'update_role'
        }
    })
    const view_role = await prisma.permission.create({
        data: {
            name: 'view_role'
        }
    })
    const delete_role = await prisma.permission.create({
        data: {
            name: 'delete_role'
        }
    })
    const create_permission = await prisma.permission.create({
        data: {
            name: 'create_permission'
        }
    })
    const update_permission = await prisma.permission.create({
        data: {
            name: 'update_permission'
        }
    })
    const view_permission = await prisma.permission.create({
        data: {
            name: 'view_permission'
        }
    })
    const delete_permission = await prisma.permission.create({
        data: {
            name: 'delete_permission'
        }
    })
    const create_order = await prisma.permission.create({
        data: {
            name: 'create_order'
        }
    })
    const update_order = await prisma.permission.create({
        data: {
            name: 'update_order'
        }
    })
    const view_order = await prisma.permission.create({
        data: {
            name: 'view_order'
        }
    })
    const delete_order = await prisma.permission.create({
        data: {
            name: 'delete_order'
        }
    })
    const create_blog = await prisma.permission.create({
        data: {
            name: 'create_blog'
        }
    })
    const update_blog = await prisma.permission.create({
        data: {
            name: 'update_blog'
        }
    })
    const view_blog = await prisma.permission.create({
        data: {
            name: 'view_blog'
        }
    })
    const delete_blog = await prisma.permission.create({
        data: {
            name: 'delete_blog'
        }
    })
    const create_media = await prisma.permission.create({
        data: {
            name: 'create_media'
        }
    })
    const update_media = await prisma.permission.create({
        data: {
            name: 'update_media'
        }
    })
    const view_media = await prisma.permission.create({
        data: {
            name: 'view_media'
        }
    })
    const delete_media = await prisma.permission.create({
        data: {
            name: 'delete_media'
        }
    })

    /* User role */
    const userRole = await prisma.role.create({
        data: {
            name: 'User',
            publish: true,
            permissions: {
                connect: [{
                    id: create_order.id
                }, {
                    id: delete_order.id
                }]
            }
        }
    })

    /* Admin role */
    const adminRole = await prisma.role.create({
        data: {
            name: 'Admin',
            publish: true,
            permissions: {
                connect: [{
                    id: create_user.id
                }, {
                    id: update_user.id
                }, {
                    id: view_user.id
                }, {
                    id: delete_user.id
                }, {
                    id: create_product.id
                }, {
                    id: update_product.id
                }, {
                    id: view_product.id
                }, {
                    id: delete_product.id
                }, {
                    id: create_category.id
                }, {
                    id: update_category.id
                }, {
                    id: view_category.id
                }, {
                    id: delete_category.id
                }, {
                    id: create_role.id
                }, {
                    id: update_role.id
                }, {
                    id: view_role.id
                }, {
                    id: delete_role.id
                }, {
                    id: create_permission.id
                }, {
                    id: update_permission.id
                }, {
                    id: view_permission.id
                }, {
                    id: delete_permission.id
                }, {
                    id: update_order.id
                }, {
                    id: view_order.id
                }]
            }
        }
    })

    const password = bcript.hashSync('password', 10)
    await prisma.user.create({
        data: {
            email: 'admin@himalayanbeads.com',
            password,
            role_id: adminRole.id,
            company_id: company.id
        }
    })
}