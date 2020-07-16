import { IHttpResponse } from 'controller/models/http-response'

export const badRequest = (errorMessage?: string): IHttpResponse<any> => ({
  data: [],
  error: true,
  errorMessage,
  statusCode: 400
})

export const success = <T>(data?: T[]): IHttpResponse<T> => ({
  data,
  error: false,
  errorMessage: null,
  statusCode: 200
})

export const serverError = (): IHttpResponse<any> => ({
  data: [],
  error: true,
  errorMessage: 'Ocorreu um erro no servidor',
  statusCode: 500
})
