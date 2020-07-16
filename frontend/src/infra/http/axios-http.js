import axios from 'axios'

export class AxiosHttp {
  async request (request) {
    try {
      const { url, method, body: data, headers, params } = request
      const response = await axios.request({
        url,
        method,
        data,
        headers,
        params
      })
      return response.data
    } catch (error) {
      return error.response.data
    }
  }
}
