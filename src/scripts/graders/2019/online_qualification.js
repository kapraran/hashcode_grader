import {to} from '../../utils.js'

class Photo {
  constructor(id, orientation, tags) {
    this.id = id
    this.orientation = orientation
    this.tags = new Set(tags)
  }

  isVertical() {
    return this.orientation === "V"
  }
}

class Slide {
  constructor(photos) {
    this.photos = photos
    this.tags = null

    this.setTags()
  }

  setTags() {
    this.tags = this.photos.reduce((acc, p) => acc.union(p.tags), new Set())
  }

  calcScore(otherSlide) {
    const common = this.tags.intersection(otherSlide.tags)
    const onlyS0 = this.tags.difference(otherSlide.tags)
    const onlyS1 = otherSlide.tags.difference(this.tags)

    return Math.min(common.size, onlyS0.size, onlyS1.size)
  }

  isValid() {
    return (this.photos.length === 1) ||
      (this.photos.length === 2 && this.photos.reduce((acc, p) => p.isVertical() && acc, true))
  }

  static createFromPhotoIds(ids, photos) {
    const selectedPhotos = ids.reduce((acc, id) => {
      acc.push(photos[id])
      return acc
    }, [])

    return new Slide(selectedPhotos)
  }
}

export default function(input, output) {
  // read the input
  const photosN = input.next()
  const photos = []

  for (let i=0; i<photosN; i++) {
    const line = input.line()
    const orientation = line.next(to.str)
    const tags = line.skip().rest(to.str)

    photos.push(new Photo(i, orientation, tags))
  }

  // read and evaluate the output
  const slidesN = output.next()
  let score = 0
  let prevSlide = Slide.createFromPhotoIds(output.arr(), photos)
  for (let i=1; i<slidesN; i++) {
  // while(!output.isEmpty()) {
    const currSlide = Slide.createFromPhotoIds(output.arr(), photos)
    score += prevSlide.calcScore(currSlide)
    prevSlide = currSlide
  }

  return score
}
