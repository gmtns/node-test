import { IWebHandler } from 'data/protocols/libs/web-handler/web-handler'
import { ISaveOrReplaceWebsiteImageUrlRepository } from 'data/protocols/save-or-replace-image-src'
import { WebsiteImageModel } from 'domain/models/website-image-model'
import faker from 'faker'
import { FetchImagesByUrl } from './fetch-images-by-url'
const fakeWebsiteModel: WebsiteImageModel = {
  url: faker.internet.url(),
  id: faker.random.uuid(),
  localImagesPath: ['any_url_path'],
  webImagesPath: [faker.internet.url()]
}

class SaveOrReplaceWebsiteImageUrlSpy implements ISaveOrReplaceWebsiteImageUrlRepository {
  async saveOrReplace (url: string, imagesSrc: string[]): Promise<WebsiteImageModel[]> {
    return [fakeWebsiteModel]
  }
}

export class WebHandlerSpy implements IWebHandler {
  async downloadImagesFromUrl (url: string[]): Promise<string[]> {
    return ['path/image.png']
  }

  async getAllWebsiteImages (websiteUrl: string): Promise<string[]> {
    return ['any_url_path']
  }
}

type SutType = {
  sut: FetchImagesByUrl
  saveOrReplace: SaveOrReplaceWebsiteImageUrlSpy
  webHandlerSpy: IWebHandler
}

const sutFactory = (): SutType => {
  const saveOrReplace = new SaveOrReplaceWebsiteImageUrlSpy()
  const webHandlerSpy = new WebHandlerSpy()
  const sut = new FetchImagesByUrl(saveOrReplace, webHandlerSpy)
  return {
    sut,
    saveOrReplace,
    webHandlerSpy
  }
}

const fakeUrl = faker.internet.url()

describe('FetchImagesByUrl', () => {
  test('should call getAllWebsiteImages with correct params', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    const spyOn = jest.spyOn(webHandlerSpy, 'getAllWebsiteImages')
    await sut.extractImage(fakeUrl)
    expect(spyOn).toHaveBeenCalledWith(fakeUrl)
  })

  test('should throw if getAllWebsiteImages from throws', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'getAllWebsiteImages').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl)
    await expect(result).rejects.toThrow()
  })

  test('should return null if getAllWebsiteImages no has paths', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'getAllWebsiteImages').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const result = await sut.extractImage(fakeUrl)
    expect(result).toBeNull()
  })

  test('should call downloadImageFrom with correct params', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    const spyOn = jest.spyOn(webHandlerSpy, 'downloadImagesFromUrl')
    await sut.extractImage(fakeUrl)
    expect(spyOn).toHaveBeenCalledWith(['any_url_path'])
  })

  test('should throw if downloadImage from throws', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'downloadImagesFromUrl').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl)
    await expect(result).rejects.toThrow()
  })

  test('should return null if downloadImageFrom no has paths', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'downloadImagesFromUrl').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const result = await sut.extractImage(fakeUrl)
    expect(result).toBeNull()
  })

  test('should call saveOrReplace with correct params', async () => {
    const { sut, saveOrReplace } = sutFactory()
    const spyOn = jest.spyOn(saveOrReplace, 'saveOrReplace')
    await sut.extractImage(fakeUrl)
    expect(spyOn).toHaveBeenCalledWith(fakeUrl, ['path/image.png'])
  })

  test('should throws if saveOrReplace throws', async () => {
    const { sut, saveOrReplace } = sutFactory()
    jest.spyOn(saveOrReplace, 'saveOrReplace').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl)
    await expect(result).rejects.toThrow()
  })

  test('should return an array of WebsiteImageMolde if succeeds', async () => {
    const { sut } = sutFactory()
    const result = await sut.extractImage(fakeUrl)
    expect(result).toEqual([fakeWebsiteModel])
  })
})
