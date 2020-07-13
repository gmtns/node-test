export interface IWebHandler {
  downloadImagemFrom: (url: string) => Promise<string[]>
}
