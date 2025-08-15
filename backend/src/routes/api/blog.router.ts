import { Router } from "express"

import { verifyAccessToken } from "@/app/http/middleware/verify_access_token.middleware"
import { BlogController } from "@/app/http/controllers/blog.controller"

const router = Router()

router.get('/', [], BlogController.index)
router.post('/', [verifyAccessToken], BlogController.create)
router.get('/:id', [], BlogController.view)
router.get('/bySlug/:slug', [], BlogController.bySlug)
router.put('/:id', [verifyAccessToken], BlogController.update)
router.delete('/:id', [verifyAccessToken], BlogController.destory)
router.put('/:id/publish', [verifyAccessToken], BlogController.publish)
router.put('/:id/update_body', [verifyAccessToken], BlogController.updateDescription)
router.put('/:id/save_image', [verifyAccessToken], BlogController.saveImage)
router.put('/:id/save_tags', [verifyAccessToken], BlogController.addTag)

export default router