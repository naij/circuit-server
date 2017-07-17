'use strict'

let _ = require('lodash')

module.exports = app => {
  class Assets extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * updateRecord(opt) {
      return yield this.app.models.assets.update({
        status: opt.status
      }, {
        where: {
          id: opt.id
        }
      })
    }
    * createRecord(opt) {
      return yield this.app.models.assets.create({
        sha: opt.sha,
        appName: opt.appName,
        refName: opt.refName
      })
    }
    * getRecordList(opt) {
      return yield this.app.models.assets.findAndCountAll({
        order: 'createdAt DESC',
        limit: opt.pageSize,
        offset: opt.pageSize * (opt.pageNo - 1)
      })
    }
    * getRecordDetail(id) {
      return yield this.app.models.assets.findById(id)
    }
  }

  return Assets
}