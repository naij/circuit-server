'use strict'

// 后台接口
function admin(app) {
  app.get('/api/article/list.json', app.controller.article.list)
  app.get('/api/article/detail.json', app.controller.article.detail)
  app.get('/api/tag/list.json', app.controller.tag.list)
  app.get('/api/pubinfo.json', app.controller.member.pubInfo)
  app.post('/api/login.json', app.controller.member.login)
  app.get('/api/logout.json', app.controller.member.logout)
  app.get('/api/article/full.json', app.controller.article.full)
  app.post('/api/article/create.json', app.controller.article.create)
  app.post('/api/article/update.json.json', app.controller.article.update)
  app.post('/api/article/remove.json', app.controller.article.remove)
  app.get('/api/pic/list.json', app.controller.pic.list)
  app.post('/api/pic/create.json', app.controller.pic.create)
}

// 页面路径
function pages(app) {
  app.get('/', app.controller.home.index)
  app.get('/debug', app.controller.home.debug)
  app.get('/404', app.controller.home.notfound)
  app.get('/manage/login', app.controller.home.index)
  app.get('/manage/index', app.controller.home.index)
  app.get('/manage/article/list', app.controller.home.index)
  app.get('/manage/article/add', app.controller.home.index)
  app.get('/manage/article/edit', app.controller.home.index)
  app.get('/manage/picture/list', app.controller.home.index)
  app.get('/manage/tool/list', app.controller.home.index)
}

module.exports = function(app) {
  pages(app)
  admin(app)
}