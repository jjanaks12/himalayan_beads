import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)

export default router