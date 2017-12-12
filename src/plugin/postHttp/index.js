import postHttp from './postHttp'

let plugin = {
  install (Vue, options) {
    Vue.prototype.postHttp = postHttp()
  }
}
export default plugin
