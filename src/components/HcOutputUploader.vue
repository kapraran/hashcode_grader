<template>
  <div class="hc-output-uploader">
    <div class="title">
      <i class="icon fas fa-tag"></i>
      <span class="label">{{ file.label }}</span>
    </div>
    <div class="content">
      <div class="uploader">
        <a class="button is-link">Upload File</a>
        <span class="tag is-light is-medium">
          <span v-if="!outputFile" class="placeholder">or drop file here</span>
          <span v-if="outputFile">{{ outputFile }}</span>
        </span>
      </div>
      <div class="score">
        <span class="val">{{ currentScore }}</span>
        <span class="pts">pts</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hc-uploader',
  props: ['file'],

  data () {
    return {
      currentScore: 0,
      bestScore: 0,
      outputFile: null
    }
  },
}
</script>

<style lang="scss">
.hc-output-uploader {
  padding-bottom: 24px;

  .title {
    display: flex;
    align-items: center;
    padding-bottom: 8px;

    .icon {
      margin-right: 8px;
    }
  }

  .content {
    display: flex;
    align-items: center;

    .uploader {
      display: flex;
      align-items: center;
      flex: 1;

      .button {
        margin-right: 16px;
      }

      .tag {
        margin-right: 16px;
        flex: 1;
        text-align: center;

        .placeholder {
          opacity: 0.8;
          font-style: italic;
        }
      }
    }

    .score .val {
      display: inline-block;
      text-align: right;
      font-size: 20px;
      min-width: 100px;
    }
  }
}
</style>
