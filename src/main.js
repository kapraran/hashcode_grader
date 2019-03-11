import Vue from 'vue'
import HcApp from './components/HcApp.vue'

import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js'
import '../node_modules/@fortawesome/fontawesome-free/js/solid.min.js'

// -- Implementation of basic Set operations - by MDN
Set.prototype.union = function(setB) {
    const union = new Set(this)
    for (let elem of setB) {
        union.add(elem)
    }
    return union
}

Set.prototype.intersection = function(setB) {
    const intersection = new Set();
    for (let elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem)
        }
    }
    return intersection
}

Set.prototype.difference = function(setB) {
    const difference = new Set(this);
    for (let elem of setB) {
        difference.delete(elem)
    }
    return difference;
}
// --

new Vue({
  el: '#app',
  render: h => h(HcApp)
})
