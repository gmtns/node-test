import { ISaveOrReplaceWebsiteImageUrlRepository } from 'data/protocols/save-or-replace-image-src'
import { Mongo } from '../../infra/database/mongoose-schemas'
import { WebsiteImageModel } from '../../domain/models/website-image-model'
import { IFindByUrlRepository } from 'data/protocols/find-by-url-repository'

export class WebsiteUrlsRepository implements ISaveOrReplaceWebsiteImageUrlRepository, IFindByUrlRepository {
  async saveOrReplace (url: string, imagesSrc: string[]): Promise<WebsiteImageModel[]> {
    const result = await Mongo.websiteUrl.update(
      { url },
      { localImagesPath: imagesSrc },
      { new: true, upsert: true }
    )

    const { upserted, nModified } = result

    if (!upserted.length && !nModified) {
      return []
    }

    const mapperIdsModified = Mongo.websiteUrl.find({
      _id: { $in: result.upserted.map(result => result._id) }
    })

    return mapperIdsModified
  }

  async findByUrl (url: string): Promise<WebsiteImageModel[]> {
    return await Mongo.websiteUrl.find({ url })
  }
}
