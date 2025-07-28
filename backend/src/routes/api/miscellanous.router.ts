import { Router } from 'express'

import { MiscellanousController } from '@/app/http/controllers/miscellanous.controller'

const router = Router()

router.get('/countries', [], MiscellanousController.getCountries)

export default router