
import scrape from 'website-scraper'
import { IWebHandler } from 'data/protocols/libs/web-hander/web-handler'

export class WebHandlerAdapter implements IWebHandler {
  async downloadImagemFrom (url: string): Promise<string[]> {
    const result = await scrape(
      {
        urls: [url],
        directory: '/images',
        sources: [{ selector: 'img', attr: 'src' }]
      }
    )
    return result.map(image => image.url)
  }
}
