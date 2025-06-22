import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { RoleController } from '@/app/http/controllers/role.controller'

const router = Router()

router.get('/', [verifyAccessToken], RoleController.index)
router.post('/', [verifyAccessToken], RoleController.create)
router.put('/:role_id', [verifyAccessToken], RoleController.update)
router.delete('/:role_id', [verifyAccessToken], RoleController.destory)

export default router