import mongoose, { Schema } from 'mongoose'
import { mongoMapperId } from '../helpers/mongoose-mapper-id'
import { WebsiteImageModel } from 'domain/models/website-image-model'

const WebsiteImageUrlSchema = new Schema({
  url: { type: String, required: true, unique: true },
  localImagesPath: { type: [String], required: true }
})

mongoMapperId(WebsiteImageUrlSchema)

type MongooseWebsiteImageUrlModel = WebsiteImageModel & mongoose.Document

export default mongoose.model<MongooseWebsiteImageUrlModel>('website_url', WebsiteImageUrlSchema)
