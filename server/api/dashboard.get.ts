import { PrismaClient } from "@prisma/client"

import { APIResponse, DashboardDetail } from "~/himalayan_beads"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  let res: APIResponse<DashboardDetail> = {
    status: 'success',
    data: {
      categories: await prisma.category.count(),
      products: await prisma.product.count(),
    }
  }

  return res
})
