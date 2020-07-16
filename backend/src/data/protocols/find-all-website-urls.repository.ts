import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface IFindAllWebsiteDatabaseRepository {
  findAll: () => Promise<WebsiteImageModel[]>
}
