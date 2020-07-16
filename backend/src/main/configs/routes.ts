
import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import { Server } from 'socket.io'
import path from 'path'

export default (app: Express, io: Server): void => {
  const router = Router()
  app.use('/api/v1', router)
  readdirSync(path.resolve(__dirname, '../', 'routes')).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router, io)
    }
  })
}
