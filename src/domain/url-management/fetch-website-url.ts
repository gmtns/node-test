import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface IFetchWebsiteImageSrc {
  extractImage: (url: string) => Promise<WebsiteImageModel[]>
}
