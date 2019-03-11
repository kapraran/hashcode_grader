import Vue from 'vue'
import HcApp from './components/HcApp.vue'

import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js'
import '../node_modules/@fortawesome/fontawesome-free/js/solid.min.js'

new Vue({
  el: '#app',
  render: h => h(HcApp)
})
