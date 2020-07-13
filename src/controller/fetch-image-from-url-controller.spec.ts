import { WebsiteImageModel } from 'domain/models/website-image-model'
import { IFetchWebsiteImageSrc } from 'domain/url-management/fetch-website-url'
import { IAllWebsitesDatabase } from 'domain/url-management/get-all-urls-database'
import { response } from 'express'
import { FetchImageFromUrlController } from './fetch-image-from-url-controller'
import { badRequest, serverError, success } from './helpers/responses/http-response'

class FetchWebsiteUrlSpy implements IFetchWebsiteImageSrc {
  async extractImage (url: string): Promise<WebsiteImageModel[]> {
    return [{
      url: 'any_url',
      id: 'any_id',
      localImagesPath: ['any_path']
    }]
  }
}

class FetchImagesDatabaseSpy implements IAllWebsitesDatabase {
  async getAll (): Promise<WebsiteImageModel[]> {
    return [{
      url: 'any_url',
      id: 'any_id',
      localImagesPath: ['any_path']
    }]
  }
}

type SutType = {
  sut: FetchImageFromUrlController
  fetchImagesByUrlSpy: FetchWebsiteUrlSpy
  fetchImagesDatabaseSpy: FetchImagesDatabaseSpy
}

const sutFactory = (): SutType => {
  const fetchImagesByUrlSpy = new FetchWebsiteUrlSpy()
  const fetchImagesDatabaseSpy = new FetchImagesDatabaseSpy()
  const sut = new FetchImageFromUrlController(fetchImagesByUrlSpy, fetchImagesDatabaseSpy)
  return {
    sut,
    fetchImagesByUrlSpy,
    fetchImagesDatabaseSpy
  }
}

const fakeRequest: any = {
  body: {
    url: 'any_url'
  }
}

const fakeResponse: any = {}

describe('FetchImageFromUrlController', () => {
  test('should return a badRequest error if request.body doesn\'t have correct fields', async () => {
    const { sut } = sutFactory()
    const invalidBodyRequest: any = {
      body: {
        any_wrong_field: 'any_value'
      }
    }
    const result = await sut.addWebsiteImages(invalidBodyRequest, fakeResponse)
    expect(result).toEqual(badRequest('Campo url deve ser fornecido no corpo da requisição.'))
  })

  test('should call fetchImages by url with correct params', async () => {
    const { sut, fetchImagesByUrlSpy } = sutFactory()
    const spyOn = jest.spyOn(fetchImagesByUrlSpy, 'extractImage')
    await sut.addWebsiteImages(fakeRequest, response)
    expect(spyOn).toHaveBeenCalledWith(fakeRequest.body.url)
  })

  test('should return a serverError if  fetchImages throws', async () => {
    const { sut, fetchImagesByUrlSpy } = sutFactory()
    jest.spyOn(fetchImagesByUrlSpy, 'extractImage').mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await sut.addWebsiteImages(fakeRequest, fakeResponse)
    expect(result).toEqual(serverError())
  })

  test('should return a bad request if fetch return an empty array', async () => {
    const { sut, fetchImagesByUrlSpy } = sutFactory()
    jest.spyOn(fetchImagesByUrlSpy, 'extractImage').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const result = await sut.addWebsiteImages(fakeRequest, fakeResponse)
    expect(result).toEqual(badRequest('A url já existe na base de dados ou o site não possui imagens. Por favor, verifique'))
  })

  test('should return success if succeeds', async () => {
    const { sut } = sutFactory()
    const result = await sut.addWebsiteImages(fakeRequest, fakeResponse)
    expect(result).toEqual(success([{
      url: 'any_url',
      id: 'any_id',
      localImagesPath: ['any_path']
    }]))
  })

  describe('getAllWebsiteRegistered', () => {
    test('should call getAllWebsiteRegistered', async () => {
      const { sut, fetchImagesDatabaseSpy } = sutFactory()
      const spyOn = jest.spyOn(fetchImagesDatabaseSpy, 'getAll')
      await sut.getAllWebsiteRegistered()
      expect(spyOn).toHaveBeenCalled()
    })

    test('should return server error if getAllWebsiteRegistered throws', async () => {
      const { sut, fetchImagesDatabaseSpy } = sutFactory()
      jest.spyOn(fetchImagesDatabaseSpy, 'getAll').mockImplementationOnce(() => {
        throw new Error()
      })
      const result = await sut.getAllWebsiteRegistered()
      expect(result).toEqual(serverError())
    })

    test('should return success  if getAllWebsiteRegistered succeeds', async () => {
      const { sut } = sutFactory()
      const result = await sut.getAllWebsiteRegistered()
      expect(result).toEqual(success([{
        url: 'any_url',
        id: 'any_id',
        localImagesPath: ['any_path']
      }]))
    })
  })
})
