'use strict'

let _ = require('lodash')
let markdown = require('markdown-js')

module.exports = app => {
  class Article extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * activedList(opt) {
      let articles = yield this.app.models.article.findAndCountAll({
        where: {
          type: opt.type,
          status: {
            '$ne': 2
          }
        },
        order: 'createdAt DESC',
        limit: opt.pageSize,
        offset: opt.pageSize * (opt.pageNo - 1)
      })
      return articles
    }
    * removedList(opt) {
      let articles = yield this.app.models.article.findAndCountAll({
        where: {
          status: 2
        },
        order: 'updatedAt DESC',
        limit: opt.pageSize,
        offset: opt.pageSize * (opt.pageNo - 1)
      })
      return articles
    }
    * detail(id) {
      let article = yield this.app.models.article.findById(id)
      return article
    }
    * create(postData) {
      let md = postData.content
      let html = markdown.makeHtml(md)

      let article = yield this.app.models.article.create({
        type: postData.type,
        tag: postData.tag,
        title: postData.title,
        content: html,
        markdown: md.replace(/&/g, "&amp;"),
        status: postData.draft ? 0 : 1
      })

      return article
    }
    * update(postData) {
      let md = postData.content
      let html = markdown.makeHtml(md)

      let article = yield this.app.models.article.update({
        title: postData.title,
        content: html,
        markdown: md.replace(/&/g, "&amp;"),
        status: postData.draft ? 0 : 1
      }, {
        where: {
          id: postData.id
        }
      })

      return article
    }
    * remove(postData) {
      let article = yield this.app.models.article.update({
        status: 2
      }, {
        where: {
          id: postData.id
        }
      })
      return article
    }
    * removeComplete(postData) {
      let article = yield this.app.models.article.destroy({
        where: {
          id: postData.id
        }
      })
      return article
    }
  }

  return Article
}