import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface IFetchWebsiteUrl {
  extractImage: (url: string, replace: boolean) => Promise<WebsiteImageModel[]>
}
