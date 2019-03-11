<template>
  <div id="app-container">
    <hc-header
      :manifest="manifest"
      @yearChange="onYearChange"
      @roundChange="onRoundChange">
    </hc-header>

    <main>
      <div>
        <div id="hc-uploader">
          <hc-output-uploader v-for="file in files" :file="file"></hc-output-uploader>
        </div>
      </div>

      <aside>
        <hc-problem v-if="problem" :problem="problem"></hc-problem>
        <hc-scoreboard :files="files"></hc-scoreboard>
      </aside>
    </main>
  </div>
</template>

<script>
import HcHeader from './HcHeader.vue'
import HcProblem from './HcProblem.vue'
import HcOutputUploader from './HcOutputUploader.vue'
import HcScoreboard from './HcScoreboard.vue'
import manifest from '../hashcode_grader_manifest.json'

export default {
  name: 'app',
  components: {
    HcHeader,
    HcProblem,
    HcOutputUploader,
    HcScoreboard
  },

  data () {
    return {
      manifest,
      selectedYear: null,
      selectedRound: null,
      problem: null,
      files: []
    }
  },

  mounted() {
    this.$on('')
  },

  methods: {
    onYearChange(year) {
      this.selectedYear = year
      this.onStateChange()
    },

    onRoundChange(round) {
      this.selectedRound = round
      this.onStateChange()
    },

    onStateChange() {
      const yearRounds = this.manifest[this.selectedYear]
      for (let roundData of yearRounds) {
        if (roundData.round !== this.selectedRound)
          continue

        this.files = roundData.input.map(data => Object.assign(data, {bestScore: 0}))
        this.problem = roundData.problem
        break
      }
    }
  }
}
</script>

<style lang="scss">
$hc-padding-ds: 32px;

#app {

}

#app-container {
  /*color: #56b983;*/
}

main {
  display: flex;

  & > div, & > aside {
    display: flex;
    flex-direction: column;
    padding: 0 $hc-padding-ds $hc-padding-ds $hc-padding-ds;
  }

  & > div {
    flex: 1;
    flex-shrink: 0;
  }

  & > aside {
    flex: 1;
  }
}

// #hc-uploader {
//   padding: 0 32px 32px 32px;
// }
</style>
