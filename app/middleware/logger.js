/**
 * 用户访问日志
 * @param  {onject} options config那边传过来的配置
 * @param  {object} app     app对象
 * @return {object}         中间件
 */

'use strict'

let _ = require('lodash')
let path = require('path')
let moment = require('moment')
let excludeRequestLogExts = [ 
  '.js',
  '.css',
  '.png',
  '.svg',
  '.gif',
  '.jpg',
  '.ico'
]

module.exports = (options, app) => {
  return function* logger(next) {
    yield next

    let requestExt = path.extname(this.path)
    if (excludeRequestLogExts.indexOf(requestExt) >= 0) {
      return
    }
    let runtime = Date.now() - this.starttime

    let params = ''

    if (!_.isEmpty(this.query)) {
      params += 'query: ' + JSON.stringify(this.query)
    }
    if (!_.isEmpty(this.request.body)) {
      if (params) {
        params += ' '
      }
      params += 'body:' + JSON.stringify(this.request.body)
    }

    this.logger.info(`${params} status ${this.status} (${runtime}ms)`)
  }
}