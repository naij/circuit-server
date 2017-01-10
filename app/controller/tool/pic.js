'use strict'

var path     = require('path')
var fs       = require('mz/fs')
var images   = require("images")
var thunkify = require('thunkify')

function upload(client, path, file, cb) {
  client.putFile(path, file, cb)
}

exports.list = function*() {
  let pics = yield this.service.tool.pic.list()
  return this.renderJSON({
    code: 200,
    data: pics
  })
}

exports.create = function*() {
  var body = this.request.body
  console.log(body)
  return this.renderJSON({
    code: 200
  })
  var picPath = body.files.pic.path
  var picName = picPath.split('/')[1]
  picPath = path.resolve(picPath)

  // 读取上传的临时文件
  var file = yield fs.readFile(picPath)

  // 上传到upyun
  var upyunInfo = yield thunkify(upload)(this.upyunClient, '/c/' + picName, file)

  // 获取图片尺寸
  var size = images(picPath).size()

  // 保存到数据库
  var pic = yield this.service.tool.pic.create({
    picPath: '/c/' + picName,
    picSize: size.width + 'x' + size.height
  })

  // 删除临时文件
  yield fs.unlink(picPath)

  return this.renderJSON({
    code: 200
  })
}