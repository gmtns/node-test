<template>
  <section class="flex flex-col items-center p-10">
    <div class="relative mb-10 w-1/2">
      <input @keypress.enter="addWebsite" type="text" placeholder="Informe a url e pressione enter! ex: https://www.google.com.br" class="block w-full rounded-full shadow bg-white h-10 px-5 pr-16  text-sm focus:border-2 focus:border-blue-500 focus:outline-none">
        <button class="absolute top-0 right-0 mt-2 mr-4 cursor-default focus:outline-none">
        <i class="fas fa-globe-americas"></i>
      </button>
    </div>
    <div class="flex flex-col h-full justify-center items-center  w-3/4 mb-5" v-for="img in images" :key="img.id">
      <span class="font-mono font-semibold mb-2 self-start "> {{ img.url }} </span>
      <div class="bg-white flex flex-wrap w-full p-4 rounded ">
        <img  v-for="(path, i) in img.localImagesPath"  :key="i" class="w-20 mb-2  border h-20 mr-2 shadow-md  p-1 bg-gray-400 rounded hover:border-blue-600 " :src="'http://localhost:5050/' + path" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    addWebsite (event) {
      console.log(event.target.value)
      this.addNewWebsite(event.target.value)
    },
    ...mapActions(['addNewWebsite', 'loadWebsites'])
  },
  created () {
    this.loadWebsites()
  },
  computed: {
    ...mapState(['images'])
  }
}
</script>
