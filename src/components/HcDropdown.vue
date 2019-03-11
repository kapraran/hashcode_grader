<template>
  <div :class="[{ 'is-active': isActive }, 'dropdown']" @click="isActive = !isActive">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ selected }}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a v-for="val in values" @click="setSelected(val)" class="dropdown-item">
          {{ val }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hc-dropdown',
  props: ['value', 'values'],
  data () {
    return {
      isActive: false,
      selected: null
    }
  },
  beforeMount() {
    this.selected = this.value
  },
  methods: {
    setSelected(val) {
      if (this.selected === val)
        return

      this.selected = val
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">

</style>
