'use strict'

let _ = require('lodash')

module.exports = app => {
  class Pic extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list() {
      let pics = yield this.ctx.models.pic.findAll()

      return pics
    }
    * create(picPath, picSize) {
      let pic = yield this.ctx.models.pic.create({
        picPath: picPath,
        picSize: picSize
      })
      return pic
    }
  }

  return Pic
}