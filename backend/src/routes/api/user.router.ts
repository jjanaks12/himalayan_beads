import { Router } from "express"
import { UserController } from "@/app/http/controllers/user.controller"
import { verifyAccessToken } from "@/app/http/middleware/verify_access_token.middleware"

const router = Router()

router.get('/', [verifyAccessToken], UserController.index)
router.get('/orders', [verifyAccessToken], UserController.userOrder)
router.get('/:id', [verifyAccessToken], UserController.view)
router.post('/checkout', [verifyAccessToken], UserController.checkout)
router.put('/assignRole', [verifyAccessToken], UserController.assignRole)

export default router