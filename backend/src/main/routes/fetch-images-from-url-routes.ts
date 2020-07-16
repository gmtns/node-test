import { Router } from 'express'
import { fetchImagesFromUrlFactory } from '../factories/fetch-images-from-url'
import { Server } from 'socket.io'

const controller = fetchImagesFromUrlFactory()

export default (router: Router, io: Server): void => {
  router.post('/imageFromUrl', async (req, res) => {
    const result = await controller.addWebsiteImages(req, res, io)
    res.status(result.statusCode).json(result)
  })

  router.get('/imageFromUrl', async (req, res) => {
    const result = await controller.getAllWebsiteRegistered()
    res.status(result.statusCode).json(result)
  })
}
