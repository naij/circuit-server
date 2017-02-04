'use strict'

let _ = require('lodash')

module.exports = app => {
  class Pic extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list(opt) {
      let config = this.app.config.upyun
      let pics = yield this.app.models.pic.findAll({
        where: {
          createdAt: {
            '$gte': opt.startTime,
            '$lte': opt.endTime
          }
        }
      })

      _.each(pics, item => {
        item.picPath = config.prefix + item.picPath
      })
      return pics
    }
    * create(opt) {
      let pic = yield this.app.models.pic.create({
        picPath: opt.picPath,
        picSize: opt.picSize
      })
      return pic
    }
  }

  return Pic
}