import { NewsletterController } from '@/app/http/controllers/newsletter.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { Router } from 'express'

const router = Router()

router.post('/', [verifyAccessToken], NewsletterController.save)

export default router