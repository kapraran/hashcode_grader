import Vue from 'vue'

export const EventBus = new Vue()

export const to = {
  int: (value) => parseInt(value),
  float: (value) => parseFloat(value),
  str: (value) => value.toString().trim()
}
