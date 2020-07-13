import { IFindByUrlRepository } from 'data/protocols/find-by-url-repository'
import { IWebHandler } from 'data/protocols/libs/web-hander/web-handler'
import { ISaveOrReplaceWebsiteImageUrlRepository } from 'data/protocols/save-or-replace-image-src'
import { WebsiteImageModel } from 'domain/models/website-image-model'
import faker from 'faker'
import { FetchImagesByUrl } from './fetch-images-by-url'

const fakeWebsiteModel: WebsiteImageModel = {
  url: faker.internet.url(),
  id: faker.random.uuid(),
  localImagesPath: [faker.internet.url()],
  webImagesPath: [faker.internet.url()]
}

// class GetAllImageSrcRepositorySpy implements IFetchImagesSrcFromUrlRepository {
//   async getAllImagesSrc (websiteUrl): Promise<string[]> {
//     return ['any_url_string']
//   }
// }

class FindByUrlRepositorySpy implements IFindByUrlRepository {
  async findByUrl (url: string): Promise<WebsiteImageModel[]> {
    return [fakeWebsiteModel]
  }
}

class SaveOrReplaceWebsiteImageUrlSpy implements ISaveOrReplaceWebsiteImageUrlRepository {
  async saveOrReplace (url: string, imagesSrc: string[]): Promise<WebsiteImageModel[]> {
    return [fakeWebsiteModel]
  }
}

// class DownloadImagesSpy implements IDownloadImagesFromSrcRepository {
//   async downloadImages (imagesSrc: string[]): Promise<string[]> {
//     return ['any_url']
//   }
// }

export class WebHandlerSpy implements IWebHandler {
  async downloadImagemFrom (url: string): Promise<string[]> {
    return ['path/image.png']
  }
}

type SutType = {
  sut: FetchImagesByUrl
  findByUrlSpy: FindByUrlRepositorySpy
  saveOrReplace: SaveOrReplaceWebsiteImageUrlSpy
  webHandlerSpy: IWebHandler
}

const sutFactory = (): SutType => {
  const findByUrlSpy = new FindByUrlRepositorySpy()
  const saveOrReplace = new SaveOrReplaceWebsiteImageUrlSpy()
  const webHandlerSpy = new WebHandlerSpy()
  const sut = new FetchImagesByUrl(findByUrlSpy, saveOrReplace, webHandlerSpy)
  return {
    sut,
    findByUrlSpy,
    saveOrReplace,
    webHandlerSpy
  }
}

const fakeUrl = faker.internet.url()

describe('FetchImagesByUrl', () => {
  test('should call find by url with correct param if override false', async () => {
    const { sut, findByUrlSpy } = sutFactory()
    const spyOn = jest.spyOn(findByUrlSpy, 'findByUrl')
    await sut.extractImage(fakeUrl, false)
    expect(spyOn).toHaveBeenCalledWith(fakeUrl)
  })

  test('should return an error if override false and findUrl returns an array', async () => {
    const { sut } = sutFactory()
    const result = await sut.extractImage(fakeUrl, false)
    expect(result).toBeNull()
  })

  test('should throws if findByUrl throws', async () => {
    const { sut, findByUrlSpy } = sutFactory()
    jest.spyOn(findByUrlSpy, 'findByUrl').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl, false)
    await expect(result).rejects.toThrow()
  })

  test('should call downloadImageFrom with correct params', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    const spyOn = jest.spyOn(webHandlerSpy, 'downloadImagemFrom')
    await sut.extractImage(fakeUrl, true)
    expect(spyOn).toHaveBeenCalledWith(fakeUrl)
  })

  test('should throw if downloadImage from throws', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'downloadImagemFrom').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl, true)
    await expect(result).rejects.toThrow()
  })

  test('should return null if downloadImageFrom no has paths', async () => {
    const { sut, webHandlerSpy } = sutFactory()
    jest.spyOn(webHandlerSpy, 'downloadImagemFrom').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const result = await sut.extractImage(fakeUrl, true)
    expect(result).toBeNull()
  })

  test('should call saveOrReplace with correct params', async () => {
    const { sut, saveOrReplace } = sutFactory()
    const spyOn = jest.spyOn(saveOrReplace, 'saveOrReplace')
    await sut.extractImage(fakeUrl, true)
    expect(spyOn).toHaveBeenCalledWith(fakeUrl, ['path/image.png'])
  })

  test('should throws if saveOrReplace throws', async () => {
    const { sut, saveOrReplace } = sutFactory()
    jest.spyOn(saveOrReplace, 'saveOrReplace').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.extractImage(fakeUrl, true)
    await expect(result).rejects.toThrow()
  })

  test('should return an array of WebsiteImageMolde if succeds', async () => {
    const { sut } = sutFactory()
    const result = await sut.extractImage(fakeUrl, true)
    expect(result).toEqual([fakeWebsiteModel])
  })
})

// test('should call getAllImagesSrc with correct params if  override is true', async () => {
//   const { sut, getAllImageSrcSpy } = sutFactory()
//   const spyOn = jest.spyOn(getAllImageSrcSpy, 'getAllImagesSrc')
//   await sut.extractImage(fakeUrl, true)
//   expect(spyOn).toHaveBeenCalledWith(fakeUrl)
// })

// test('should throws if getAllImages throws', async () => {
//   const { sut, getAllImageSrcSpy } = sutFactory()
//   jest.spyOn(getAllImageSrcSpy, 'getAllImagesSrc').mockImplementationOnce(() => {
//     throw new Error()
//   })
//   const result = sut.extractImage(fakeUrl, true)
//   await expect(result).rejects.toThrow()
// })

// test('should return null if getImages not  found images', async () => {
//   const { sut, getAllImageSrcSpy } = sutFactory()
//   jest.spyOn(getAllImageSrcSpy, 'getAllImagesSrc').mockReturnValueOnce(new Promise(resolve => resolve([])))
//   const result = await sut.extractImage(fakeUrl, true)
//   expect(result).toBeNull()
// })

// test('should call downloadImages if getAllImages return a valid array', async () => {
//   const { sut, downloadImagesSpy } = sutFactory()
//   const spyOn = jest.spyOn(downloadImagesSpy, 'downloadImages')
//   await sut.extractImage(fakeUrl, true)
//   expect(spyOn).toHaveBeenCalledWith(['any_url_string'])
// })

// test('should throws if downloadImagesSpy throws', async () => {
//   const { sut, downloadImagesSpy } = sutFactory()
//   jest.spyOn(downloadImagesSpy, 'downloadImages').mockImplementationOnce(() => {
//     throw new Error()
//   })
//   const result = sut.extractImage(fakeUrl, true)
//   await expect(result).rejects.toThrow()
// })

// test('should return null if localPaths return an empty array', async () => {
//   const { sut, downloadImagesSpy } = sutFactory()
//   jest.spyOn(downloadImagesSpy, 'downloadImages').mockReturnValueOnce(new Promise(resolve => resolve([])))
//   const result = await sut.extractImage(fakeUrl, true)
//   await expect(result).toBeNull()
// })
