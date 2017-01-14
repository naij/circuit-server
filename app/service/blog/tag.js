'use strict'

let _ = require('lodash')

module.exports = app => {
  class Tag extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list() {
      let tags = yield this.ctx.models.tag.findAll()

      return tags
    }
  }

  return Tag
}