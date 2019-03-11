<template>
  <div :class="['dropdown', 'is-right', { 'is-active': isActive }]" @click="activate">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ getLabel(selectedIndex) }}</span>
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a v-for="(val, i) in values" @click="setSelected(i)" class="dropdown-item">
          {{ getLabel(i) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from '../utils'

export default {
  name: 'hc-dropdown',
  props: ['value', 'values', 'labels'],
  data () {
    return {
      isActive: false,
      selectedIndex: 0
    }
  },

  beforeMount() {
    // check if value prop exists and is valid
    if (this.value && this.values.indexOf(this.value) > -1)
      this.selectedIndex = this.values.indexOf(this.value)

    this.$emit('change', this.values[this.selectedIndex])
    EventBus.$on('hc-dropdown:deactivate', () => this.isActive = false)
  },

  watch: {
    value(newValue, oldValue) {
      const index = this.values.indexOf(newValue)

      if (index > -1) {
        if (this.selectedIndex !== index)
          this.$emit('change', this.values[index])

        this.selectedIndex = index
      }
    },

    values(newValues, oldValues) {
      if (this.value && newValues.indexOf(this.value) > -1)
        this.selectedIndex = newValues.indexOf(this.value)
      else
        this.selectedIndex = 0

      this.$emit('change', this.values[this.selectedIndex])
    }
  },

  methods: {
    activate() {
      // disable any other dropdown
      if (!this.isActive)
        EventBus.$emit('hc-dropdown:deactivate')

      this.isActive = !this.isActive
    },

    getLabel(i) {
      return !this.labels ? this.values[i]: this.labels[i]
    },

    setSelected(i) {
      if (this.selectedIndex === i)
        return

      this.selectedIndex = i
      this.$emit('change', this.values[i])
    }
  }
}
</script>

<style lang="scss">

</style>
