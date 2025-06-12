import { Router } from 'express'

import { AuthController } from '@/app/http/controllers/auth.controller'

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/refresh-token', AuthController.refreshToken)
router.delete('/logout', AuthController.logout)

export default router