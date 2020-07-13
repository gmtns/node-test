import { Mongoose } from 'mongoose'
import { Mongo } from '../database/mongoose-schemas'
import connectMongoDatabase from '../../main/configs/database-connection'
import { WebsiteUrlsRepository } from './website-urls-database-repository'
import faker from 'faker'
import { WebsiteImageModel } from 'domain/models/website-image-model'

const sutFactory = (): WebsiteUrlsRepository => {
  return new WebsiteUrlsRepository()
}

const fakeLocalImagePath = [faker.internet.url()]
const fakeUrlParam = faker.internet.url()

// TODO Mover esse fake pro domain e reaproveitar tanto no data layer quanto aqui
const fakeWebsiteModel: WebsiteImageModel = {
  id: faker.random.uuid(),
  url: fakeLocalImagePath[0],
  localImagesPath: fakeLocalImagePath
}

let connection: Mongoose
describe('WebsiteUrlsRepository', () => {
  beforeAll(async () => {
    connection = await connectMongoDatabase()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(async () => {
    await Mongo.websiteUrl.deleteMany({})
  })

  describe('SaveOrReplace', () => {
    test('should return a WebsiteImageModel if succeds', async () => {
      const sut = sutFactory()
      await Mongo.websiteUrl.create(fakeWebsiteModel)
      const result = await sut.saveOrReplace(fakeUrlParam, fakeLocalImagePath)
      expect(result[0].localImagesPath[0]).toEqual(fakeWebsiteModel.localImagesPath[0])
      expect(result[0].url).toEqual(fakeUrlParam)
    })

    test('should throws if Mongo update throws', async () => {
      const sut = sutFactory()
      jest.spyOn(Mongo.websiteUrl, 'update').mockImplementationOnce((): any => {
        throw new Error()
      })
      const result = sut.saveOrReplace(fakeUrlParam, fakeLocalImagePath)
      await expect(result).rejects.toThrow()
    })

    test('should return empty array if result return modified 0 and upserted empty ', async () => {
      const sut = sutFactory()
      jest.spyOn(Mongo.websiteUrl, 'update').mockImplementationOnce((): any => {
        return { upserted: [], ok: 1, nModified: 0 }
      })
      const result = await sut.saveOrReplace(fakeUrlParam, fakeLocalImagePath)
      expect(result).toEqual([])
    })

    test('should throws if Mongo find throws', async () => {
      const sut = sutFactory()
      jest.spyOn(Mongo.websiteUrl, 'find').mockImplementationOnce((): any => {
        throw new Error()
      })
      const result = sut.saveOrReplace(fakeUrlParam, fakeLocalImagePath)
      await expect(result).rejects.toThrow()
    })
  })

  describe('FindByUrl', () => {
    test('should return a WebsiteImageModel if succeds', async () => {
      const sut = sutFactory()
      await Mongo.websiteUrl.create(fakeWebsiteModel)
      const result = await sut.findByUrl(fakeWebsiteModel.url)
      expect(result[0].localImagesPath[0]).toEqual(fakeWebsiteModel.localImagesPath[0])
      expect(result[0].url).toEqual(fakeWebsiteModel.url)
    })

    test('should throws if Mongo find throws', async () => {
      const sut = sutFactory()
      jest.spyOn(Mongo.websiteUrl, 'find').mockImplementationOnce((): any => {
        throw new Error()
      })
      const result = sut.findByUrl(fakeWebsiteModel.url)
      await expect(result).rejects.toThrow()
    })

    test('should return a empty array if url not found', async () => {
      const sut = sutFactory()
      await Mongo.websiteUrl.create(fakeWebsiteModel)
      const result = await sut.findByUrl('invalid url')
      expect(result).toEqual([])
    })
  })
})
