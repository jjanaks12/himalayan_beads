import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import path from 'node:path'
import fs from 'node:fs'

const router = Router()
import { __basedir } from '@/index'

router.get('/', async (_: Request, response: Response) => {
    response.status(200).json({
        status: 'success',
        data: {
            message: 'All OK!!'
        }
    })
})

router.get('/resources/:filetype/:filename', async (request: Request, response: Response) => {
    const uploadPath = path.join(__basedir, '/uploads/', request.params.filetype, request.params.filename)

    fs.readFile(uploadPath, (err, data) => {
        if (err)
            createHttpError.InternalServerError(err.message)

        response.set('Content-Type', 'image/jpeg')
        response.send(data)
    })
})

export default router