export interface IWebHandler {
  downloadImagesFromUrl: (url: string[]) => Promise<string[]>
  getAllWebsiteImages: (url: string) => Promise<string[]>
}
