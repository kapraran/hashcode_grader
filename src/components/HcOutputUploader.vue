<template>
  <div class="hc-output-uploader">
    <div class="title">
      <i class="icon fas fa-tag"></i>
      <span class="label">{{ file.label }}</span>
      <span v-if="notification" :class="['tag', notification.type]">{{ notification.text }}</span>
    </div>
    <div class="content">
      <div class="uploader">
        <label>
          <a :class="['button', 'is-link', {'is-loading': loading}]">Upload file</a>
          <input type="file" ref="f" :disabled="loading" @change="onFileChange">
        </label>
        <span class="tag is-light is-medium" @drop="onFileDrop" @dragover="$event.preventDefault()">
          <span v-if="!outputFile" class="placeholder">or drop file here</span>
          <span v-if="outputFile">{{ outputFile.name }}</span>
        </span>
      </div>
      <div class="score">
        <span class="val">{{ fmtNumber(score) }}</span>
        <span class="pts">pts</span>
      </div>
    </div>
  </div>
</template>

<script>
import HcReader from '../scripts/reader'
import graderLoader from '../scripts/graders'
import {fmtNumber} from '../scripts/utils'

export default {
  name: 'hc-uploader',
  props: ['year', 'round', 'file'],

  data () {
    return {
      loading: false,
      score: 0,
      outputFile: null,
      notification: null
    }
  },

  watch: {
    file() {
      this.score = 0
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

    onFileDrop(ev) {
      ev.preventDefault()
      if (this.loading)
        return

      this.loading = true
      this.score = 0

      if (ev.dataTransfer.items) {
        if (ev.dataTransfer.items[0].kind !== 'file')
          throw Error("Invalid file type")
        this.outputFile = ev.dataTransfer.items[0].getAsFile()
      } else {
        this.outputFile = ev.dataTransfer.files[i]
      }

      this.calcOutputScore()
    },

    calcOutputScore() {
      this.setNotification('is-primary', 'Reading output file...')

      const fsReader = new FileReader()
      fsReader.onload = (ev) => {
        const content = ev.target.result
        const hcOutputReader = new HcReader(content)

        this.setNotification('is-primary', 'Downloading input file...')
        HcReader
          .createFromRemoteInput(this.year, this.round, this.file.filename)
          .then(hcInputReader => {
            this.setNotification('is-primary', 'Calculating score...')
            const graderFunction = graderLoader(this.year, this.round)
            return graderFunction(hcInputReader, hcOutputReader)
          })
          .then(score => {
            this.setNotification(null)
            this.setScore(score)
            this.loading = false
          })
          .catch(err => {
            console.error(err)
            this.setNotification('is-danger', 'There was some error, the output is invalid.')
            this.loading = false
          })
      }

      fsReader.readAsText(this.outputFile)
    },

    setScore(score) {
      this.score = score

      if (score > this.file.bestScore)
        this.$emit('best', score, this.file)
    },

    setNotification(type, text) {
      if (type === null)
        return this.notification = null

      this.notification = {
        type, text
      }
    },

    fmtNumber(n) {
      return fmtNumber(n)
    }
  }
}
</script>

<style lang="scss">
.hc-output-uploader {
  padding-bottom: 32px;

  .title {
    display: flex;
    align-items: center;
    padding-bottom: 12px;

    .icon {
      margin-right: 16px;
    }

    .label {
      font-size: 18px;
      margin-right: 16px;
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
