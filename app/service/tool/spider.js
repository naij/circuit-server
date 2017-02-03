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
    * getHTMLByUrl(url) {
      return yield this.app.models.spiderHTML.find({
        where: {
          url: url
        }
      })
    }
    * getHTMLById(id) {
      return yield this.app.models.spiderHTML.find({
        where: {
          id: id
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
      return yield this.app.models.spiderRecord.find({
        where: {
          appId: opt.appId,
          htmlId: opt.htmlId,
          spiderName: opt.spiderName
        }
      })
    }
    * getRecordList() {
      return yield this.app.models.spiderRecord.findAll({
        order: 'createdAt DESC'
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