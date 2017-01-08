'use strict'

let _ = require('lodash')

module.exports = app => {
  class Pic extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list() {
      let pics = yield this.app.models.Pic.findAll()

      return pics
    }
    * create(picPath, picSize) {
      let pic = yield this.app.models.Pic.create({
        picPath: picPath,
        picSize: picSize
      })
      return pic
    }
  }

  return Pic
}