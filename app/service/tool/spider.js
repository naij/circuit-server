'use strict'

let _ = require('lodash')

module.exports = app => {
  class Spider extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * appList() {
      return yield this.app.models.spiderApp.findAll()
    }
    * getHTML(url) {
      return yield this.app.models.spiderHTML.find({
        where: {
          url: url
        }
      })
    }
    * createHTML(opt) {
      return yield this.app.models.spiderHTML.create({
        appId: opt.appId,
        url: opt.url,
        html: opt.html
      })
    }
    * getRecord(opt) {
      let whereOpt = {
        htmlId: opt.htmlId,
        spiderName: opt.spiderName
      }

      if (opt.appId) {
        whereOpt.appId = opt.appId
      }

      return yield this.app.models.spiderRecord.findAll({
        where: whereOpt
      })
    }
    * updateRecord(opt) {
      return yield this.app.models.spiderRecord.update({
        count: opt.count
      }, {
        where: {
          id: opt.id
        }
      })
    }
    * createRecord(opt) {
      return yield this.app.models.spiderRecord.create({
        appId: opt.appId,
        htmlId: opt.htmlId,
        url: opt.url,
        spiderName: opt.spiderName
      })
    }
  }

  return Spider
}