import { Router } from "express"
import { verifyAccessToken } from "@/app/http/middleware/verify_access_token.middleware"
import { OrderController } from "@/app/http/controllers/order.controller"

const router = Router()

router.get('/', [verifyAccessToken], OrderController.index)
router.put('/:id/status', [verifyAccessToken], OrderController.updateStatus)
router.delete('/:id', [verifyAccessToken], OrderController.delete)

export default router