import cheerio from 'cheerio'
import request from 'request'
import { IWebHandler } from '../../data/protocols/libs/web-handler/web-handler'
import download from 'image-downloader'

export class WebHandlerAdapter implements IWebHandler {
  async getAllWebsiteImages (websiteUrl: string): Promise<string[]> {
    const fetchImagesUrls = new Promise((resolve, reject) => {
      request(websiteUrl, (error: any, response: request.Response, body: any) => {
        if (error || response.statusCode !== 200) {
          reject(new Error('Ocorreu um erro ao acessar as imagens do website'))
          return
        }
        const $ = cheerio.load(body)
        const imagesUrl = []
        $('img').each((index: number, element: CheerioElement) => {
          const fullImagePath = new URL($(element).attr('src'), websiteUrl)
          imagesUrl.push(fullImagePath.href)
        })
        resolve(imagesUrl)
      })
    })
    return await fetchImagesUrls as string[]
  }

  async downloadImagesFromUrl (urls: string[]): Promise<string[]> {
    const localPath = []
    for (const url of urls) {
      const extension = url.split('.').pop()
      const imgRegex = (/\.(gif|jpe?g|tiff?|png|webp|bmp|sbg|svg)/gi)
      if (!imgRegex.test(url)) {
        continue
      }
      const urlUniqueName = `${new Date().getTime()}.${extension}`
      console.log(urlUniqueName)
      const downloadUrl = await download.image({ url, dest: `./images/${urlUniqueName}`, extractFilename: true })
      const urlParser = downloadUrl.filename.replace('\\', '/')
      localPath.push(urlParser)
    }
    return localPath
  }
}
