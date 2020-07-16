import Vue from 'vue'
import Vuex from 'vuex'
import { ImagesManagement } from '../data/images.js'
import { AxiosHttp } from '../infra/http/axios-http.js'
Vue.use(Vuex)

const httpClient = new AxiosHttp()
const imagesHttp = new ImagesManagement(httpClient, 'http://localhost:5050/api/v1/imageFromUrl')

export default new Vuex.Store({
  state: {
    images: []
  },
  mutations: {
    loadImages (state, payload) {
      state.images = payload
    },
    SOCKET_ADD_WEBSITE (state, payload) {
      console.log('socket add', payload)
      state.images.push(payload)
    }
  },
  actions: {
    async addNewWebsite (context, payload) {
      await imagesHttp.create(payload)
      // context.commit('SOCKET_ADD_WEBSITE', images.data[0])
    },
    async loadWebsites (context, payload) {
      const images = await imagesHttp.list()
      context.commit('loadImages', images.data)
    }
  },
  modules: {
  }
})
