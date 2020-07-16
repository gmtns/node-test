export class ImagesManagement {
  constructor (http, url) {
    this.http = http
    this.url = url
  }

  async create (websiteUrl) {
    const response = await this.http.request({
      method: 'post',
      url: this.url,
      body: {
        url: websiteUrl
      }
    })

    const { errorMessage, statusCode } = response

    if (response.error) {
      throw { errorMessage, statusCode }
    }
    const { data } = response
    return {
      data
    }
  }

  async list () {
    const response = await this.http.request({
      method: 'get',
      url: this.url
    })

    const { errorMessage, statusCode } = response

    if (response.error) {
      throw { errorMessage, statusCode }
    }

    const { data } = response
    return {
      data
    }
  }
}
