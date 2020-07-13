import { IFindByUrlRepository } from 'data/protocols/find-by-url-repository'
import { IWebHandler } from 'data/protocols/libs/web-hander/web-handler'
import { ISaveOrReplaceWebsiteImageUrlRepository } from 'data/protocols/save-or-replace-image-src'
import { WebsiteImageModel } from 'domain/models/website-image-model'
import { IFetchWebsiteUrl } from 'domain/url-management/fetch-website-url'

export class FetchImagesByUrl implements IFetchWebsiteUrl {
  constructor (
    private readonly findByUrl: IFindByUrlRepository,
    private readonly saveOrReplaceImage: ISaveOrReplaceWebsiteImageUrlRepository,
    private readonly webHandler: IWebHandler
  ) {

  }

  async extractImage (url: string, override: boolean): Promise<WebsiteImageModel[]> {
    if (!override) {
      const urlExists = await this.findByUrl.findByUrl(url)

      if (urlExists.length) {
        return null
      }
    }

    const localPaths = await this.webHandler.downloadImagemFrom(url)

    if (!localPaths.length) {
      return null
    }

    const result = await this.saveOrReplaceImage.saveOrReplace(url, localPaths)

    return result
  }
}
