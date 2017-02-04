'use strict'

let _ = require('lodash')

exports.activedList = function*() {
  let type = this.query.type
  let pageNo = parseInt(this.query.pageNo) || 1
  let pageSize = parseInt(this.query.pageSize) || 50
  let articles = yield this.service.blog.article.activedList({
    type: type,
    pageNo: pageNo,
    pageSize: pageSize
  })
  return this.renderJSON({
    code: 200,
    data: {
      list: articles.rows,
      totalCount: articles.count
    }
  })
}

exports.removedList = function*() {
  let pageNo = parseInt(this.query.pageNo) || 1
  let pageSize = parseInt(this.query.pageSize) || 50
  let articles = yield this.service.blog.article.removedList({
    pageNo: pageNo,
    pageSize: pageSize
  })
  return this.renderJSON({
    code: 200,
    data: {
      list: articles.rows,
      totalCount: articles.count
    }
  })
}

exports.detail = function*() {
  let id = this.query.id
  let article = yield this.service.blog.article.detail(id)
  return this.renderJSON({
    code: 200,
    data: article
  })
}

exports.create = function*() {
  let postData = this.request.body
  let article = yield this.service.blog.article.create(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.update = function*() {
  let postData = this.request.body
  let article = yield this.service.blog.article.update(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.remove = function*() {
  let postData = this.request.body
  let article = yield this.service.blog.article.remove(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}

exports.removeComplete = function*() {
  let postData = this.request.body
  let article = yield this.service.blog.article.removeComplete(postData)

  return this.renderJSON({
    code: 200,
    data: {
      id: article.id
    }
  })
}