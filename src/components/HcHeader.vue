<template>
  <header id="main-header">
    <div id="logo">
      <img src="../../images/logo.png" alt="hashcode logo">
      <h1>Hashcode Grader</h1>
    </div>
    <nav id="options">
      <hc-dropdown :value="selectedYear" :values="yearList" @change="onYearChange"></hc-dropdown>
      <hc-dropdown :value="selectedRound" :values="roundList" @change="onRoundChange"></hc-dropdown>
    </nav>
  </header>
</template>

<script>
  import HcDropdown from './HcDropdown.vue'

export default {
  name: 'hc-header',
  props: ['manifest'],
  components: {
    HcDropdown
  },

  data () {
    return {
      selectedYear: 0,
      selectedRound: 0
    }
  },

  created() {
    this.selectedYear = this.yearList[0]
    this.selectedRound = this.roundList[0]
  },

  methods: {
    onYearChange(year) {
      this.selectedYear = year
    },

    onRoundChange(round) {
      this.selectedRound = round
    }
  },

  computed: {
    yearList() {
      return Object
        .keys(this.manifest)
        .map(y => parseInt(y))
        .sort()
        .reverse()
    },

    roundList() {
      return this.manifest[this.selectedYear].map(r => r.round)
    }
  }
}
</script>

<style lang="scss">
  $logo-size: 64px;

  #main-header {
    display: flex;
    justify-content: space-between;
    padding: 32px;
  }

  #logo {
    display: flex;
    align-items: center;

    img {
      display: block;
      height: $logo-size;
      width: $logo-size;
    }

    h1 {
      font-weight: 700;
      font-size: 32px;
      padding-left: 16px;
    }
  }

  nav#options {
    display: flex;
    align-items: center;

    .dropdown {
      margin-right: 16px;
    }
  }
</style>
