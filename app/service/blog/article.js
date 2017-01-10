'use strict'

let _ = require('lodash')
let markdown = require('markdown-js')

module.exports = app => {
  class Article extends app.Service {
    constructor(ctx) {
      super(ctx)
    }
    * list(opt) {
      let queryOpt = {}
      let whereOpt = {
        status: 1
      }

      if (opt.type) {
        whereOpt.type = opt.type
      }

      if (opt.limit) {
        queryOpt.limit = opt.limit
      }

      queryOpt.where = whereOpt

      let articles = yield this.app.models.article.findAll(queryOpt)
      return articles
    }
    * full(type) {
      let articles = yield this.app.models.article.findAll({
        where: {
          type: type
        }
      })
      return articles
    }
    * detail(id) {
      let article = yield this.app.models.article.findById(id)
      return article
    }
    * readbytag(tag) {
      let articles = yield this.app.models.article.findAll({
        where: {
          tag: tag,
          status: 1
        }
      })
      return articles
    }
    * taggroup() {
      let tags = yield this.app.models.article.findAll({
        attributes: [
          ['tag', 'tagName'],
          [this.app.models.sequelize.fn('count', 'tag'), 'count']
        ],
        where: {
          status: 1
        },
        group: ['tag']
      })
      return tags
    }
    * archive() {
      let articles = yield this.app.models.article.findAll({
        attributes: [
          'id',
          'title',
          'type',
          [this.app.models.sequelize.fn('date_format', this.app.models.sequelize.col('createdAt'), '%Y-%m'), 'ym']
        ],
        where: {
          status: 1
        },
        raw: true
      })

      let archiveList = []
      for (let i = 0; i < articles.length;) {
        let count = 0
        let obj = {
          ym: articles[i].ym,
          list: []
        }
        for (let j = i; j < articles.length; j++) {
          if (articles[i].ym == articles[j].ym) {
            obj.list.push(articles[j])
            count ++
          }
        }
        archiveList.push(obj)
        i += count
      }
      return archiveList
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
  }

  return Article
}