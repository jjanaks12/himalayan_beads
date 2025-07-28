import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import productRouter from '@/routes/api/product.router'
import categoryRouter from '@/routes/api/category.router'
import roleRouter from '@/routes/api/role.router'
import permissionRouter from '@/routes/api/permission.router'
import newsletterRouter from '@/routes/api/newsletter.router'
import mediaRouter from '@/routes/api/media.router'
import miscellanousRouter from '@/routes/api/miscellanous.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/roles', roleRouter)
router.use('/permissions', permissionRouter)
router.use('/newsletters', newsletterRouter)
router.use('/images', mediaRouter)
router.use('/', miscellanousRouter)

export default router