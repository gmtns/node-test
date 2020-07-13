import { FetchImageFromUrlController } from '../../controller/fetch-image-from-url-controller'
import { FetchImagesByUrl } from '../../data/business-rules/url-management/fetch-images-by-url'
import { WebHandlerAdapter } from '../../infra/libs/web-handler-adapter'
import { WebsiteUrlsRepository } from '../../infra/repositories/website-urls-database-repository'
import { FetchImagesDatabase } from '../../data/business-rules/url-management/fetch-images-database'

export const fetchImagesFromUrlFactory = (): FetchImageFromUrlController => {
  const webHandlerAdapter = new WebHandlerAdapter()
  const websiteUrlRepository = new WebsiteUrlsRepository()
  const fetchImagesByUrl = new FetchImagesByUrl(websiteUrlRepository, webHandlerAdapter)
  const fetchImagesDatabase = new FetchImagesDatabase(websiteUrlRepository)
  return new FetchImageFromUrlController(fetchImagesByUrl, fetchImagesDatabase)
}
