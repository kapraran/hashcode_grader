<template>
  <div id="app-container">
    <hc-header :manifest="manifest" @yearChange="onYearChange" @roundChange="onRoundChange"></hc-header>

    <main>
      <div id="hc-uploader">
        <hc-output-uploader v-for="file in files" :file="file"></hc-output-uploader>
      </div>

      <hc-scoreboard :files="files"></hc-scoreboard>
    </main>
  </div>
</template>

<script>
 import HcHeader from './HcHeader.vue'
 import HcOutputUploader from './HcOutputUploader.vue'
 import HcScoreboard from './HcScoreboard.vue'
 import manifest from '../hashcode_grader_manifest.json'

export default {
  name: 'app',
  components: {
    HcHeader,
    HcOutputUploader,
    HcScoreboard
  },

  data () {
    return {
      manifest,
      selectedYear: null,
      selectedRound: null,
      files: []
    }
  },

  mounted() {
    this.$on('')
  },

  methods: {
    onYearChange(year) {
      this.selectedYear = year
      this.loadFiles()
    },

    onRoundChange(round) {
      this.selectedRound = round
      this.loadFiles()
    },

    loadFiles() {
      const yearRounds = this.manifest[this.selectedYear]
      for (let roundData of yearRounds) {
        if (roundData.round !== this.selectedRound)
          continue

        return this.files = roundData.input.map(data => Object.assign(data, {bestScore: 0}))
      }
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>
