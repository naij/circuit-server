'use strict'

let path = require('path')
let _ = require('lodash')

module.exports = {
  renderJSON(data) {
    if (data && _.isPlainObject(data)) {
      this.body = data
      return
    }

    this.body = {
      code: 500,
      message: 'json render error'
    }
  }
}