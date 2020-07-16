import { ISaveOrReplaceWebsiteImageUrlRepository } from 'data/protocols/save-or-replace-image-src'
import { Mongo } from '../../infra/database/mongoose-schemas'
import { WebsiteImageModel } from '../../domain/models/website-image-model'
import { IFindAllWebsiteDatabaseRepository } from 'data/protocols/find-all-website-urls.repository'

export class WebsiteUrlsRepository implements ISaveOrReplaceWebsiteImageUrlRepository, IFindAllWebsiteDatabaseRepository {
  async saveOrReplace (url: string, imagesSrc: string[]): Promise<WebsiteImageModel[]> {
    const result = await Mongo.websiteUrl.update(
      { url },
      { localImagesPath: imagesSrc },
      { new: true, upsert: true }
    )
    console.log(result)
    if (!result.ok) {
      return []
    }

    const mapperIdsModified = result?.upserted && Mongo.websiteUrl.find({
      _id: { $in: result.upserted.map(result => result._id) }
    })

    return mapperIdsModified
  }

  async findAll (): Promise<WebsiteImageModel[]> {
    return await Mongo.websiteUrl.find()
  }
}
