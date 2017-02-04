'use strict'

let path     = require('path')
let images   = require('images')
let thunkify = require('thunkify')
let Moment   = require('moment')
let sendToWormhole = require('stream-wormhole')

function upload(client, path, file, cb) {
  client.putFile(path, file, null, null, null, cb)
}

exports.list = function*() {
  let startTime = this.query.startTime
  let endTime = this.query.endTime
  startTime = Moment(startTime).format('YYYY-MM-DD')
  endTime = Moment(endTime).add(1, 'd').format('YYYY-MM-DD')
  let pics = yield this.service.tool.pic.list({
    startTime: startTime,
    endTime: endTime
  })
  return this.renderJSON({
    code: 200,
    data: pics
  })
}

exports.create = function*() {
  let stream = yield this.getFileStream()
  let filename = stream.filename
  let picName = this.helper.md5(filename) + path.extname(filename)
  
  try {
    // stream 转换为 buffer
    let buffer = yield this.helper.streamToBuffer(stream)
    
    // 上传到upyun
    yield thunkify(upload)(this.upyunClient, '/c/' + picName, buffer)

    // 获取图片尺寸
    let size = images(buffer).size()

    // 保存到数据库
    yield this.service.tool.pic.create({
      picPath: '/c/' + picName,
      picSize: size.width + 'x' + size.height
    })
  } catch(e) {
    this.app.loggers.logger.error('upyun upload error:' + e)
    // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    yield sendToWormhole(stream)
  }

  return this.renderJSON({
    code: 200
  })
}