<template>
  <div class="hc-output-uploader">
    {{ file.label }}
  </div>
</template>

<script>
export default {
  name: 'hc-uploader',
  props: ['file'],

  data () {
    return {}
  },
}
</script>

<style lang="scss">
.hc-output-uploader {

}
</style>
