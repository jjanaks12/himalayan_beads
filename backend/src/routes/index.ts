import { NextFunction, Request, Response, Router } from "express"

import APIRoute from "@/routes/api"
import WebRoute from "@/routes/web"
import createHttpError from "http-errors"

const router: Router = Router()

router.use('/api', APIRoute)
router.use('/', WebRoute)

router.use(async (_: Request, response: Response, next: NextFunction) => {
    next(createHttpError.NotFound())
})

router.use((error: any, request: Request, response: Response, next: NextFunction) => {
    let status = error.status || 500
    const newError: any = {
        status: status,
        message: error.message
    }

    if (error.errors && error.errors.length > 0) {
        status = 422
        newError.errors = error.errors
    }

    console.log(error);
    

    response.status(status)
        .send({
            error: newError
        })
})

export default router