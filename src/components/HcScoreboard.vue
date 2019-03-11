<template>
  <div id="hc-scoreboard">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Best Scores
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div v-for="file in files" class="file-stats">
            <span class="label">{{ file.label }}</span>
            <span class="score">{{ file.bestScore }}</span>
          </div>
          <div class="file-stats total">
            <span class="label">Total</span>
            <span class="score">{{ totalBestScore }}</span>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Clear Scores</a>
      </footer>
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
$hc-file-ds: 8px;

#hc-scoreboard {
  .file-stats {
    display: flex;
    justify-content: space-between;
    padding-bottom: $hc-file-ds;
  }

  .file-stats.total {
    font-weight: bold;
    border-top: 1px solid #ddd;
    padding-top: $hc-file-ds;
  }
}
</style>