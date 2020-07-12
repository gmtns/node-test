import { IFetchWebsiteUrl } from 'domain/url-management/fetch-website-url'
import { WebsiteImageModel } from 'domain/models/website-image-model'
import { IFetchImagesSrcFromUrlRepository } from 'data/protocols/fetch-image-src-from-url'
import { IFindByUrlRepository } from 'data/protocols/find-by-url-repository'
import { ISaveOrReplaceWebsiteImageUrl } from 'data/protocols/save-or-replace-image-src'
import { IDownloadImagesFromSrcRepository } from 'data/protocols/dowloand-image-from-src'

export class FetchImagesByUrl implements IFetchWebsiteUrl {
  constructor (
    private readonly findByUrl: IFindByUrlRepository,
    private readonly imagesFromUrl: IFetchImagesSrcFromUrlRepository,
    private readonly saveOrReplaceImage: ISaveOrReplaceWebsiteImageUrl,
    private readonly downloadSrcImages: IDownloadImagesFromSrcRepository
  ) {

  }

  async extractImage (url: string, override: boolean): Promise<WebsiteImageModel[]> {
    if (!override) {
      const urlExists = await this.findByUrl.findByUrl(url)

      if (urlExists.length) {
        return null
      }
    }

    const imagesUrl = await this.imagesFromUrl.getAllImagesSrc(url)

    if (!imagesUrl.length) {
      return null
    }

    const localPaths = await this.downloadSrcImages.downloadImages(imagesUrl)

    if (!localPaths.length) {
      return null
    }

    const result = await this.saveOrReplaceImage.saveOrReplace(url, localPaths)

    return result
  }
}
