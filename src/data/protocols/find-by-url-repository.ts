import { WebsiteImageModel } from 'domain/models/website-image-model'

export interface IFindByUrlRepository {
  findByUrl: (url: string) => Promise<WebsiteImageModel[]>
}
