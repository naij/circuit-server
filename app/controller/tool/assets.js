'use strict'

let assetsDeploy = require('assets-deploy')
let Build = assetsDeploy.Build

exports.list = function*() {
  let pageNo = parseInt(this.query.pageNo) || 1
  let pageSize = parseInt(this.query.pageSize) || 50
  let list = yield this.service.tool.assets.getRecordList({
    pageNo: pageNo,
    pageSize: pageSize
  })
  return this.renderJSON({
    code: 200,
    data: {
      list: list.rows,
      totalCount: list.count
    }
  })
}

exports.build = function*() {
  let postData = this.request.body
  let build = new Build(postData)
  let refName = postData.ref.match(/refs\/(heads|tags)\/(.*)$/)[2]

  if (/(daily|publish)\/[\d]*.[\d]*.[\d]*$/.test(refName) && !postData.deleted) {
    let recordModel = yield this.service.tool.assets.createRecord({
      sha: postData.after,
      appName: postData.repository.name,
      refName: refName
    })

    let execResp = yield build.run()

    if (execResp) {
      yield this.service.tool.assets.updateRecord({
        id: recordModel.id,
        status: 2
      })
    } else {
      yield this.service.tool.assets.updateRecord({
        id: recordModel.id,
        status: 0
      })
    }
  }
  
  return this.renderJSON({
    code: 200
  })
}