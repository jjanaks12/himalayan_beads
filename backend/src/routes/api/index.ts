import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import productRouter from '@/routes/api/product.router'
import roleRouter from '@/routes/api/role.router'
import permissionRouter from '@/routes/api/permission.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/products', productRouter)
router.use('/roles', roleRouter)
router.use('/permissions', permissionRouter)

export default router