import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { CategoryController } from '@/app/http/controllers/category.controller'

const router = Router()

router.get('/', [verifyAccessToken], CategoryController.index)
router.post('/', [verifyAccessToken], CategoryController.create)
router.put('/:category_id', [verifyAccessToken], CategoryController.update)
router.delete('/:category_id', [verifyAccessToken], CategoryController.delete)

export default router