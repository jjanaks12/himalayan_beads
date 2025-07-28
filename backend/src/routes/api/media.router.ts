import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { MediaController } from '@/app/http/controllers/media.controller'

const router = Router()

router.get('/', [verifyAccessToken], MediaController.index)
// router.post('/', [verifyAccessToken], MediaController.create)
// router.delete('/:category_id', [verifyAccessToken], MediaController.delete)

export default router