'use strict'

/**
 * upyun client 初始化
 */


/**
 * Module dependencies.
 */
let Upyun = require('upyun')

module.exports = app => {
  let config = app.config.upyun
  let bucketName = config.bucketName
  let username = process.env.UPYUN_USERNAME
  let password = process.env.UPYUN_PASSWORD
  let bucket = new Upyun.Bucket(bucketName, username, password)
  app.upyunClient = new Upyun.Client(bucket)
}