import {to} from './utils.js'

class Line {
  constructor(line, delim=' ') {
    this.segments = line.split(delim)
    this.index = 0
  }

  next(converter=to.int) {
    return converter(this.segments[++this.index])
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
}

class Reader {
  constructor(lines) {
    this.lines = lines
    this.index = 0
  }

  line() {
    return new Line(this.lines[++this.index])
  }

  next(converter=to.int) {
    return this.line().next(converter)
  }

  arr(converter=to.int) {
    return this.line().rest(converter)
  }

  static createFromRemote() {

  }
}

export default Reader
