import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { ProductController } from '@/app/http/controllers/product.controller'

const router = Router()

router.get('/', [], ProductController.index)
router.get('/:id', [verifyAccessToken], ProductController.view)
router.post('/', [verifyAccessToken], ProductController.create)
router.put('/:product_id', [verifyAccessToken], ProductController.update)
router.delete('/:product_id', [verifyAccessToken], ProductController.delete)
router.put('/:product_id/update_description', [verifyAccessToken], ProductController.updateDescription)

router.get('/by_category/:slug', [], ProductController.productsByCategory)

router.put('/:product_id/save_images', [verifyAccessToken], ProductController.saveImages)
router.put('/:product_id/image/:image_id/set_featured_image', [verifyAccessToken], ProductController.setFeaturedImage)
router.delete('/:image_id/delete_image', [verifyAccessToken], ProductController.deleteImage)

router.post('/:product_id/add_stock', [verifyAccessToken], ProductController.addStock)
router.put('/:stock_id/update_stock', [verifyAccessToken], ProductController.updateStock)

router.post('/:product_id/add_price', [verifyAccessToken], ProductController.addPrice)
router.put('/:product_id/price/:price_id/update_price', [verifyAccessToken], ProductController.updatePrice)
router.delete('/:price_id/delete_price', [verifyAccessToken], ProductController.deletePrice)

export default router