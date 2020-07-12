import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface ISaveOrReplaceWebsiteImageUrl {
  saveOrReplace: (url: string, imagesSrc: string[]) => Promise<WebsiteImageModel[]>
}
