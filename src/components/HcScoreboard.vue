<template>
  <div id="hc-scoreboard">
    <div v-for="file in files">
      {{ file.label }} {{ file.bestScore }}
    </div>
    <div>
      best {{ totalBestScore }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'hc-scoreboard',
  props: ['files'],

  data() {
    return {}
  },

  methods: {
    clearScores() {
      this.$emit('hc-scoreboard:clear')
    }
  },

  computed: {
    totalBestScore() {
      return this.files.reduce((sum, file) => sum + (file.bestScore || 0), 0)
    }
  }
}
</script>

<style lang="scss">
#hc-scoreboard {

}
</style>