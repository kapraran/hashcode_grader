import axios from 'axios'

const cache = {}

export default function(year, round, filename) {
  const url = `./assets/input/${year}/${round}/${filename}`

  // check cache
  if (url in cache)
    return Promise.resolve(cache[url])

  return axios.get(url).then(response => {
    cache[url] = response.data
    return cache[url]
  })
}