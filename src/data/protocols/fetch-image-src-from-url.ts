export interface IFetchImagesSrcFromUrlRepository {
  getAllImagesSrc: (websiteUrl) => Promise<string[]>
}
