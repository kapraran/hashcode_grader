import Vue from 'vue'

export const EventBus = new Vue()

export const to = {
  int: (value) => parseInt(value),
  float: (value) => parseFloat(value),
  str: (value) => value.toString().trim()
}

export const fmtNumber = function(n) {
  return Array.from(n.toString()).reverse()
    .reduce((acc, c, i) => {
      acc.push(i > 0 && i % 3 == 0 ? `${c},`: c)
      return acc
    }, []).reverse().join('')
}
