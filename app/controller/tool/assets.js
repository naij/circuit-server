'use strict'

let BuildDaily = require('./assets/build_daily')
let BuildPublish = require('./assets/build_publish')
let Logger = require('./assets/lib/logger')
let logger = new Logger()

exports.list = function*() {

}

exports.build = function*() {
  let postData = this.request.body
  let refName = postData.payload.ref
  let buildDaily = new BuildDaily(postData.payload)
  let buildPublish = new BuildPublish(postData.payload)

  if (/daily\/[\d]*.[\d]*.[\d]*$/.test(refName)) {
    logger.info('您提交的是一个日常发布,进入日常发布流程...')
    yield buildDaily.run()
  } else if (/publish\/[\d]*.[\d]*.[\d]*$/.test(refName)) {
    logger.info('您提交的是一个正式发布,进入正式发布流程...')
    yield buildPublish.run()
  } else {
    logger.error('您提交的格式不对,请检查后重新提交.')

  }
}