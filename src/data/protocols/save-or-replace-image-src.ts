import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface ISaveOrReplaceWebsiteImageUrlRepository {
  saveOrReplace: (url: string, imagesSrc: string[]) => Promise<WebsiteImageModel[]>
}
