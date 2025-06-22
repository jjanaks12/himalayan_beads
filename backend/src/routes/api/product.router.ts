import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { ProductController } from '@/app/http/controllers/product.controller'

const router = Router()

router.get('/', [verifyAccessToken], ProductController.index)
router.post('/', [verifyAccessToken], ProductController.create)
router.put('/:product_id', [verifyAccessToken], ProductController.update)
router.delete('/:product_id', [verifyAccessToken], ProductController.delete)

export default router