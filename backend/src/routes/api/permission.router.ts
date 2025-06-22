import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { PermissionController } from '@/app/http/controllers/permission.controller'

const router = Router()

router.get('/', [verifyAccessToken], PermissionController.index)
router.post('/', [verifyAccessToken], PermissionController.create)
router.put('/:permission_id', [verifyAccessToken], PermissionController.update)
router.delete('/:permission_id', [verifyAccessToken], PermissionController.destory)

export default router