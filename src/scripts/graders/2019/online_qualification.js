import {to} from '../../utils.js'

class Photo {
  constructor(id, orientation, tags) {
    this.id = id
    this.orientation = orientation
    this.tags = tags
  }

  isVertical() {
    return this.orientation === "V"
  }
}

class Slide {
  constructor(photos) {
    this.photos = photos
  }

  isValid() {
    return this.photos.length === 2 && this.photos.reduce((acc, p) => p.isVertical() && acc, true)
  }
}

export default function(input, output) {
  // read the input
  const N = input.next()
  const photos = []

  for (let i=0; i<N; i++) {
    const line = input.line()
    const orientation = line.next(to.str)
    const tags = line.skip().rest()

    photos.push(new Photo(i, orientation, tags))
  }

  // read and evaluate the output
  let score = 0

  return score
}
