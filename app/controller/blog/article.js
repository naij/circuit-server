'use strict'

let _ = require('lodash')

exports.list = function*() {
  let type = this.query.type
  let articles = yield this.service.blog.article.list({type: type})
  return this.renderJSON({
    code: 200,
    data: articles
  })
}

exports.full = function*() {
  let type = this.query.type
  let articles = yield this.service.blog.article.full(type)
  return this.renderJSON({
    code: 200,
    data: articles
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

exports.readbytag = function*() {
  let tag = this.query.tag
  let articles = yield this.service.blog.article.readbytag(tag)
  return this.renderJSON({
    code: 200,
    data: articles
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