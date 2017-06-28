'use strict'

let assetsDeploy = require('assets-deploy')
let BuildDaily = assetsDeploy.BuildDaily
let BuildPublish = assetsDeploy.BuildPublish
let Logger = assetsDeploy.Logger
let logger = new Logger()

exports.list = function*() {

}

exports.build = function*() {
  let postData = this.request.body
  let payload = JSON.parse(postData.payload)
  let refName = payload.ref
  let buildDaily = new BuildDaily(payload)
  let buildPublish = new BuildPublish(payload)

  if (/master/.test(refName) || payload.deleted) {
    // push master 分支或者删除分支、tag不触发发布行为
    return false
  } else if (/daily\/[\d]*.[\d]*.[\d]*$/.test(refName)) {
    logger.info('您提交的是一个日常发布,进入日常发布流程...')
    yield buildDaily.run()
  } else if (/publish\/[\d]*.[\d]*.[\d]*$/.test(refName)) {
    logger.info('您提交的是一个正式发布,进入正式发布流程...')
    yield buildPublish.run()
  } else {
    logger.error('您提交的分支格式不对,请检查后重新提交.')
  }
}