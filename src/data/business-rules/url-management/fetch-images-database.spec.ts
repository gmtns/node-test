import { IFindAllWebsiteDatabaseRepository } from 'data/protocols/find-all-website-urls.repository'
import { WebsiteImageModel } from 'domain/models/website-image-model'
import { FetchImagesDatabase } from './fetch-images-database'

class WebsiteUrlsRepositorySpy implements IFindAllWebsiteDatabaseRepository {
  async findAll (): Promise<WebsiteImageModel[]> {
    return [
      {
        url: 'any_url',
        id: 'any_id',
        localImagesPath: ['any_path']
      }
    ]
  }
}

type SutType = {
  websiteUrlDatabaseSpy: WebsiteUrlsRepositorySpy
  sut: FetchImagesDatabase
}

const sutFactory = (): SutType => {
  const websiteUrlDatabaseSpy = new WebsiteUrlsRepositorySpy()
  const sut = new FetchImagesDatabase(websiteUrlDatabaseSpy)
  return {
    sut,
    websiteUrlDatabaseSpy
  }
}

describe('FetchImagesDatabase', () => {
  test('should call findAll', async () => {
    const { sut, websiteUrlDatabaseSpy } = sutFactory()
    const spyOn = jest.spyOn(websiteUrlDatabaseSpy, 'findAll')
    await sut.getAll()
    expect(spyOn).toHaveBeenCalled()
  })
  test('should throw if findAll from throws', async () => {
    const { sut, websiteUrlDatabaseSpy } = sutFactory()
    jest.spyOn(websiteUrlDatabaseSpy, 'findAll').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = sut.getAll()
    await expect(result).rejects.toThrow()
  })

  test('should return an empty array if not has data', async () => {
    const { sut, websiteUrlDatabaseSpy } = sutFactory()
    jest.spyOn(websiteUrlDatabaseSpy, 'findAll').mockReturnValueOnce(
      new Promise(resolve => resolve([]))
    )
    const result = await sut.getAll()
    await expect(result).toEqual([])
  })

  test('should return an array of WebImagesModel if succeeds', async () => {
    const { sut } = sutFactory()
    const result = await sut.getAll()
    expect(result).toEqual([
      {
        url: 'any_url',
        id: 'any_id',
        localImagesPath: ['any_path']
      }
    ])
  })
})
