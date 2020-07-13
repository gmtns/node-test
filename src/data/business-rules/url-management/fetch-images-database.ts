import { IAllWebsitesDatabase } from 'domain/url-management/get-all-urls-database'
import { IFindAllWebsiteDatabaseRepository } from 'data/protocols/find-all-website-urls.repository'
import { WebsiteImageModel } from 'domain/models/website-image-model'

export class FetchImagesDatabase implements IAllWebsitesDatabase {
  constructor (private readonly websiteUrlDatabase: IFindAllWebsiteDatabaseRepository) { }

  async getAll (): Promise<WebsiteImageModel[]> {
    return await this.websiteUrlDatabase.findAll()
  }
}
