'use strict'

let fs = require('fs')
let path = require('path')
let crypto = require('crypto')
let co = require('co')
let Build = require('assets-deploy').Build

function compareSecret(remoteSecret, localSecret, gitData) {
  let hash = 'sha1=' + crypto.createHmac('sha1', localSecret).update(JSON.stringify(gitData)).digest('hex')
  
  return remoteSecret == hash
}

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

exports.detail = function*() {
  let id = this.query.id
  let appRoot = this.app.config.env === 'local' || this.app.config.env === 'unittest' ? this.app.config.baseDir : this.app.config.HOME
  let recordInfo = yield this.service.tool.assets.getRecordDetail(id)
  let logFile = path.join(appRoot, 'logs', 'assets-deploy', recordInfo.sha + '-' + recordInfo.refName.match(/(daily|publish)\/(.*)/)[1] + '.log')
  let logInfo = fs.readFileSync(logFile, 'utf-8')

  return this.renderJSON({
    code: 200,
    data: {
      info: logInfo
    }
  })
}

exports.build = function*() {
  let gitData = this.request.body
  let appRoot = this.app.config.env === 'local' || this.app.config.env === 'unittest' ? this.app.config.baseDir : this.app.config.HOME
  let remoteSecret = this.request.get('X-Hub-Signature')
  let localSecret = process.env.GITHUB_SECRET_TOKEN

  // 对比git webhook 配置的secret，防止恶意提交
  if(!compareSecret(remoteSecret, localSecret, gitData)) {
    return
  }

  return console.log(localSecret)

  // push master 分支或者删除分支、tag不触发发布行为
  if (/master/.test(gitData.ref) || gitData.deleted) {return}

  let meta = {
    gitData: gitData,
    logFile: path.join(appRoot, 'logs', 'assets-deploy', gitData.after + '-' + gitData.ref.match(/(.*)\/(daily|publish)\/(.*)/)[2] + '.log'),
    unpyunBucket: 'kiwiobjects'
  }
  let build = new Build(meta)
  let me = this, recordModel

  build.on('beforePublish', function() {
    co(function* () {
      // 创建一条发布记录
      recordModel = yield me.service.tool.assets.createRecord({
        sha: gitData.after,
        appName: gitData.repository.name,
        refName: gitData.ref.match(/refs\/(heads|tags)\/(.*)$/)[2]
      })
    })
  })
  build.on('afterPublish', function(e) {
    co(function* () {
      if (e.res) {
        // 发布成功更新状态
        yield me.service.tool.assets.updateRecord({
          id: recordModel.id,
          status: 2
        })
      } else {
        // 发布失败更新状态
        yield me.service.tool.assets.updateRecord({
          id: recordModel.id,
          status: 0
        })
      }
    })
  })
  
  yield build.run()
  
  return this.renderJSON({
    code: 200
  })
}