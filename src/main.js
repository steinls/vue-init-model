import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import './common/stylus/index.styl'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import VConsole from 'vconsole'

Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(lazyload, {
  loading: 'static/loading/loading.png'
})
/* eslint-disable no-new */
new VConsole()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
