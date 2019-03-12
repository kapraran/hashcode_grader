import {to} from './utils.js'
import downloader from './downloader'

class Line {
  constructor(line, delim=' ') {
    this.segments = line.split(delim)
    this.index = 0
  }

  next(converter=to.int) {
    return converter(this.segments[this.index++])
  }

  rest(converter=to.int) {
    const oldIndex = this.index
    this.index = this.segments.length
    return this.segments.slice(oldIndex).map(converter)
  }

  skip(n=1) {
    this.index += n
    return this
  }

  isEmpty() {
    return this.index >= this.segments.length
  }
}

class Reader {
  constructor(content) {
    this.lines = content.split('\n')
    this.index = 0
  }

  line() {
    return new Line(this.lines[this.index++])
  }

  next(converter=to.int) {
    return this.line().next(converter)
  }

  arr(converter=to.int) {
    return this.line().rest(converter)
  }

  isEmpty() {
    return this.index >= this.lines.length
  }

  static createFromRemoteInput(year, round, filename) {
    return downloader(year, round, filename)
      .then(content => new Reader(content))
  }
}

export default Reader
