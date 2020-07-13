export interface IHttpResponse<T> {
  error: boolean
  errorMessage: string
  data: T[]
  statusCode: number
}
