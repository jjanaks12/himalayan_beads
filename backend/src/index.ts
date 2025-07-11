import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import path from 'node:path'

import 'module-alias/register'
import 'dotenv/config'

import router from '@/routes'
import { Redis } from '@/lib/services/redis.service'

const PORT = process.env.PORT || 3000
const app = express()
const __basedir = path.join(__dirname, 'resources')

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(router)

const server = app.listen(PORT, () => {
    Redis.start()
    console.log(`Server is running on http://localhost:${PORT}`)
})

export { app, server, __basedir }