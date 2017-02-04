'use strict'

let _ = require('lodash')
let Spider = require('spider-spa')
let Moment = require('moment')

function getSpiderName(ua, configSpider) {
  let item
  let litterItem
  let spiderName

  for (let i = 0; i < configSpider.length; i++) {
    item = configSpider[i]
    litterItem = item.toLowerCase()
    if (!!~ua.indexOf(litterItem)) {
      spiderName = item
      break
    }
  }
  if (spiderName === 'spider') {
    spiderName = 'unKnowSpider'
  }
  return spiderName
}

exports.spider = function*() {
  let ua = this.request.headers['user-agent'].toLowerCase()
  let spiderName = getSpiderName(ua, this.app.config.spiderName)
  let originUrl = this.query.origin
  let apps = yield this.service.tool.spider.appList()
  let app
  let html
  let htmlModel
  let recordModel

  if (_.isUndefined(spiderName)) {
    this.app.loggers.logger.info('wrong1:' + originUrl + '-->' + ua)
    this.unsafeRedirect(originUrl)
    return
  }

  app = _.find(apps, function (item) {
    return !!~originUrl.indexOf(item.domain)
  })

  if (_.isUndefined(app)) {
    this.app.loggers.logger.info('wrong2:' + originUrl + '-->' + ua)
    this.unsafeRedirect(originUrl)
    return
  }

  htmlModel = yield this.service.tool.spider.getHTMLByUrl(originUrl)

  if (htmlModel) {
    this.body = htmlModel.html
  } else {
    try {
      html = yield Spider.get(originUrl)
    } catch (err) {
      this.app.loggers.logger.error('err_spider_get:' + err.stack)
      this.unsafeRedirect(originUrl)
    }

    if (html) {
      this.body = html

      htmlModel = yield this.service.tool.spider.createHTML({
        appId: app.id,
        url: originUrl,
        html: html
      })
    } else {
      this.unsafeRedirect(originUrl)
    }
  }

  recordModel = yield this.service.tool.spider.getRecord({
    appId: app.id,
    htmlId: htmlModel.id,
    spiderName: spiderName
  })

  if (recordModel) {
    yield this.service.tool.spider.updateRecord({
      id: recordModel.id,
      count: ++recordModel.count
    })
  } else {
    yield this.service.tool.spider.createRecord({
      appId: app.id,
      htmlId: htmlModel.id,
      url: originUrl,
      spiderName: spiderName
    })
  }
}

exports.list = function *() {
  let pageNo = parseInt(this.query.pageNo) || 1
  let pageSize = parseInt(this.query.pageSize) || 50
  let list = yield this.service.tool.spider.getRecordList({
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

exports.cache = function *() {
  let id = this.query.htmlid
  let htmlModel = yield this.service.tool.spider.getHTMLById(id)
  this.body = htmlModel.html
}