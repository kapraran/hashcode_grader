<template>
  <div id="app-container">
    <hc-header :manifest="manifest"/>
    <main>
      {{ msg }}
    </main>
  </div>
</template>

<script>
 import HcHeader from './HcHeader.vue'
 import manifest from '../hashcode_grader_manifest.json'

export default {
  name: 'app',
  components: {
    HcHeader
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App!',
      manifest
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>
