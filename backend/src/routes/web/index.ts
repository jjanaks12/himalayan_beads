import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'

const router = Router()

router.get('/', async (_: Request, response: Response) => {
    response.status(200).json({
        status: 'success',
        data: {
            message: 'All OK!!'
        }
    })
})

export default router