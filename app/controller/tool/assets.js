'use strict'

let path = require('path')
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
  let gitData = this.request.body
  let appRoot = this.app.config.env === 'local' || this.app.config.env === 'unittest' ? this.app.config.baseDir : this.app.config.HOME
  let meta = {
    gitData: gitData,
    logFile: path.join(appRoot, 'logs', 'assets-deploy', gitData.after + '.log'),
    unpyunBucket: 'kiwiobjects'
  }
  let build = new Build(meta)
  let refName = gitData.ref.match(/refs\/(heads|tags)\/(.*)$/)[2]

  if (/(daily|publish)\/[\d]*.[\d]*.[\d]*$/.test(refName) && !gitData.deleted) {
    // 创建一条发布记录
    let recordModel = yield this.service.tool.assets.createRecord({
      sha: gitData.after,
      appName: gitData.repository.name,
      refName: refName
    })

    let execResp = yield build.run()

    if (execResp) {
      // 发布成功更新状态
      yield this.service.tool.assets.updateRecord({
        id: recordModel.id,
        status: 2
      })
    } else {
      // 发布失败更新状态
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