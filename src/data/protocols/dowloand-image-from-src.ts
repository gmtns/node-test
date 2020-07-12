export interface IDownloadImagesFromSrcRepository {
  downloadImages: (imagesSrc: string[]) => Promise<string[]>
}
