import { Router } from "express"
import { UserController } from "@/app/http/controllers/user.controller"
import { verifyAccessToken } from "@/app/http/middleware/verify_access_token.middleware"

const router = Router()

router.get('/', [verifyAccessToken], UserController.index)

export default router