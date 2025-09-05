import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { CompanyController } from '@/app/http/controllers/company.controller'

const router = Router()

router.get('/', [], CompanyController.get)
router.post('/', [verifyAccessToken], CompanyController.store)
router.put('/:company_id', [verifyAccessToken], CompanyController.update)
// router.post('/', [verifyAccessToken], MediaController.create)
// router.delete('/:category_id', [verifyAccessToken], MediaController.delete)

export default router