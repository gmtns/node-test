import { IWebHandler } from '../../protocols/libs/web-handler/web-handler'
import { ISaveOrReplaceWebsiteImageUrlRepository } from '../../protocols/save-or-replace-image-src'
import { WebsiteImageModel } from '../../../domain/models/website-image-model'
import { IFetchWebsiteImageSrc } from '../../../domain/url-management/fetch-website-url'

export class FetchImagesByUrl implements IFetchWebsiteImageSrc {
  constructor (
    private readonly saveOrReplaceImage: ISaveOrReplaceWebsiteImageUrlRepository,
    private readonly webHandler: IWebHandler
  ) { }

  async extractImage (url: string): Promise<WebsiteImageModel[]> {
    const websiteImages = await this.webHandler.getAllWebsiteImages(url)

    if (!websiteImages.length) {
      return null
    }

    const downloadImagesPath = await this.webHandler.downloadImagesFromUrl(websiteImages)

    if (!downloadImagesPath.length) {
      return null
    }

    const result = await this.saveOrReplaceImage.saveOrReplace(url, downloadImagesPath)

    return result
  }
}
