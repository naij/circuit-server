'use strict'

// 后台接口
function admin(app) {
  app.get('/api/blog/article/list.json', app.controller.blog.article.list)
  app.get('/api/blog/article/detail.json', app.controller.blog.article.detail)
  app.get('/api/blog/tag/list.json', app.controller.blog.tag.list)
  app.get('/api/blog/article/full.json', app.controller.blog.article.full)
  app.post('/api/blog/article/create.json', app.controller.blog.article.create)
  app.post('/api/blog/article/update.json', app.controller.blog.article.update)
  app.post('/api/blog/article/remove.json', app.controller.blog.article.remove)
  app.get('/api/tool/pic/list.json', app.controller.tool.pic.list)
  app.post('/api/tool/pic/create.json', app.controller.tool.pic.create)
  app.get('/api/tool/spider/list.json', app.controller.tool.spider.list)
  app.get('/api/user/pubinfo.json', app.controller.user.member.pubInfo)
  app.post('/api/user/login.json', app.controller.user.member.login)
  app.get('/api/user/logout.json', app.controller.user.member.logout)
}

// 页面路径
function pages(app) {
  app.get('/', app.controller.page.home.index)
  app.get('/debug', app.controller.page.home.debug)
  app.get('/404', app.controller.page.home.notfound)
  app.get('/spider', app.controller.tool.spider.spider)
  app.get('/manage/login', app.controller.page.home.index)
  app.get('/manage/index', app.controller.page.home.index)
  app.get('/manage/article/list', app.controller.page.home.index)
  app.get('/manage/article/add', app.controller.page.home.index)
  app.get('/manage/article/edit', app.controller.page.home.index)
  app.get('/manage/picture/list', app.controller.page.home.index)
  app.get('/manage/spider/list', app.controller.page.home.index)
  app.get('/manage/tool/list', app.controller.page.home.index)
}

module.exports = function(app) {
  pages(app)
  admin(app)
}