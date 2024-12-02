import { PrismaClient, type Permission } from "@prisma/client"

const prisma = new PrismaClient()

const main = () => new Promise(async (resolve) => {
    await prisma.role.create({
        data: {
            name: 'User',
            publish: true
        }
    })

    await prisma.role.create({
        data: {
            name: 'Admin',
            publish: true,
            permissions: {
                create: [{
                    permission: {
                        create: { name: 'create_user' },
                    }
                }, {
                    permission: {
                        create: { name: 'update_user' },
                    }
                }, {
                    permission: {
                        create: { name: 'view_user' },
                    }
                }, {
                    permission: {
                        create: { name: 'delete_user' },
                    }
                }, {
                    permission: {
                        create: { name: 'create_product' },
                    }
                }, {
                    permission: {
                        create: { name: 'update_product' },
                    }
                }, {
                    permission: {
                        create: { name: 'view_product' },
                    }
                }, {
                    permission: {
                        create: { name: 'delete_product' },
                    }
                }, {
                    permission: {
                        create: { name: 'create_category' },
                    }
                }, {
                    permission: {
                        create: { name: 'update_category' },
                    }
                }, {
                    permission: {
                        create: { name: 'view_category' },
                    }
                }, {
                    permission: {
                        create: { name: 'delete_category' },
                    }
                }, {
                    permission: {
                        create: { name: 'create_role' },
                    }
                }, {
                    permission: {
                        create: { name: 'update_role' },
                    }
                }, {
                    permission: {
                        create: { name: 'view_role' },
                    }
                }, {
                    permission: {
                        create: { name: 'delete_role' }
                    }
                }]
            }
        }
    })
    resolve(true)
})

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })