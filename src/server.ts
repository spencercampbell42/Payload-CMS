import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import payload from 'payload'

import { seed } from './seed'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()

app.get('/', (_, res) => {
  res.redirect('/admin')
})

app.use('/assets', express.static(path.resolve(__dirname, '../assets')))

const start = async (): Promise<void> => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    payload.logger.info('---- SEEDING DATABASE ----')
    await seed(payload)
  }

  app.get('/health', (_, res) => {
    res.sendStatus(200)
  })

  const PORT = process.env.PORT || 3000
  app.listen(PORT)
}

start()
