<template>
  <div class="hc-output-uploader">
    <div class="title">
      <i class="icon fas fa-tag"></i>
      <span class="label">{{ file.label }}</span>
    </div>
    <div class="content">
      <div class="uploader">
        <label>
          <a :class="['button', 'is-link', {'is-loading': loading}]">Upload file</a>
          <input type="file" ref="f" :disabled="loading" @change="onFileChange">
        </label>
        <span class="tag is-light is-medium">
          <span v-if="!outputFile" class="placeholder">or drop file here</span>
          <span v-if="outputFile">{{ outputFile.name }}</span>
        </span>
      </div>
      <div class="score">
        <span class="val">{{ score }}</span>
        <span class="pts">pts</span>
      </div>
    </div>
  </div>
</template>

<script>
import HcReader from '../scripts/reader'
import graderLoader from '../scripts/graders'
import { setTimeout } from 'timers';

export default {
  name: 'hc-uploader',
  props: ['year', 'round', 'file'],

  data () {
    return {
      loading: false,
      score: 0,
      bestScore: 0,
      outputFile: null
    }
  },

  watch: {
    file() {
      this.score = 0
      this.bestScore = 0
      this.outputFile = null
    }
  },

  methods: {
    onFileChange(ev) {
      if (this.loading)
        return

      this.loading = true
      this.score = 0
      this.outputFile = ev.target.files[0]

      this.calcOutputScore()
    },

    calcOutputScore() {
      const fsReader = new FileReader()
      fsReader.onload = (ev) => {
        const content = ev.target.result
        const hcOutputReader = new HcReader(content)

        HcReader
          .createFromRemoteInput(this.year, this.round, this.file.filename)
          .then(hcInputReader => {
            const graderFunction = graderLoader(this.year, this.round)
            return graderFunction(hcInputReader, hcOutputReader)
          })
          .then(score => {
            this.setScore(score)
            this.loading = false
          })
          .catch(err => {
            console.error(err)
            this.loading = false
          })
      }

      fsReader.readAsText(this.outputFile)
    },

    setScore(score) {
      this.score = score

      if (score > this.bestScore) {
        this.bestScore = score
        this.$emit('best', score, this.file)
      }
    }
  }
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

      input[type="file"] {
        display: none;
      }

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

    .score {
      min-width: 100px;
      display: flex;
      text-align: right;

      .val {
        display: inline-block;
        font-size: 20px;
        line-height: 20px;
        flex: 1;
        padding-right: 4px;
      }

      .pts {
        line-height: 20px;
      }
    }
  }
}
</style>
