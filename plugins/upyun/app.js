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
  let bucket = config.bucket
  let username = process.env.UPYUN_USERNAME
  let password = process.env.UPYUN_PASSWORD
  app.upyunClient = new Upyun(bucket, username, password, 'v0.api.upyun.com', {
    apiVersion: 'v2'
  })
}