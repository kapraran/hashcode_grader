import Vue from 'vue'
import HcApp from './components/HcApp.vue'

import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js'
import '../node_modules/@fortawesome/fontawesome-free/js/solid.min.js'

// -- Implementation of basic Set operations - by MDN
Set.prototype.union = function(setB) {
    return new Set([...this, ...setB])
}

Set.prototype.intersection = function(setB) {
    return new Set([...this].filter(x => setB.has(x)))
}

Set.prototype.difference = function(setB) {
    return new Set([...this].filter(x => !setB.has(x)))
}
// --

new Vue({
  el: '#app',
  render: h => h(HcApp)
})
