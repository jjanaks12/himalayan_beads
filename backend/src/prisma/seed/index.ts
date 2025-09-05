import { PrismaClient } from "@prisma/client"

import { roleSeed } from "./role.seed"
import { countrySeed } from "./country.seed"

const prisma = new PrismaClient()
const main = () => new Promise(async (resolve) => {
    await countrySeed(prisma)
    await roleSeed(prisma)
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