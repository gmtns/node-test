import { IAllWebsitesDatabase } from 'domain/url-management/get-all-urls-database'
import { Request, Response } from 'express'
import { WebsiteImageModel } from '../domain/models/website-image-model'
import { IFetchWebsiteImageSrc } from '../domain/url-management/fetch-website-url'
import { badRequest, serverError, success } from './helpers/responses/http-response'
import { IHttpResponse } from './models/http-response'
import { Server } from 'socket.io'

export class FetchImageFromUrlController {
  constructor (
    private readonly fetchImagesByUrl: IFetchWebsiteImageSrc,
    private readonly websiteDatabase: IAllWebsitesDatabase
  ) {
  }

  async getAllWebsiteRegistered (): Promise<IHttpResponse<WebsiteImageModel>> {
    try {
      const result = await this.websiteDatabase.getAll()
      return success(result)
    } catch (error) {
      return serverError()
    }
  }

  async addWebsiteImages (request: Request, response: Response, io: Server): Promise<IHttpResponse<WebsiteImageModel>> {
    try {
      const { url } = request.body

      if (!url) {
        return badRequest('Campo url deve ser fornecido no corpo da requisição.')
      }

      const extractResult = await this.fetchImagesByUrl.extractImage(url)

      if (!extractResult?.length) {
        return badRequest('A url já existe na base de dados ou o site não possui imagens. Por favor, verifique')
      }
      io.emit('ADD_WEBSITE', ...extractResult)

      return success<WebsiteImageModel>(extractResult)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
