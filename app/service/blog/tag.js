'use strict'

let _ = require('lodash')

module.exports = app => {
  class Tag extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list() {
      let tags = yield this.app.models.tag.findAll()

      return tags
    }
  }

  return Tag
}