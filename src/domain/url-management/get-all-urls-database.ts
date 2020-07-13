import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface IAllWebsitesDatabase {
  getAll: () => Promise<WebsiteImageModel[]>
}
