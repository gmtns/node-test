import Vue from 'vue'
import App from './App.vue'
import router from './main/router/index.js'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import './presentantion/assets/styles/tailwind.css'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:5050/'), // options object is Optional
  vuex: {
    store,
    mutationPrefix: 'SOCKET_'
  }
})
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
