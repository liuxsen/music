import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger.js'
import song from './modules/song'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    song
  },
  strict: debug,
  plugins: debug ? [createLogger] : []
})
