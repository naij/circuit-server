'use strict'

let _ = require('lodash')

function formatReferer(ctx, rootPath) {
  let query = ctx.query
  let referer = query.redirect || ctx.get('referer') || rootPath
  return referer
}

// 登录
exports.login = function*() {
  var body = this.request.body
  var nickname = _.trim(body.nickname)
  var password = _.trim(body.password)

  if (!nickname || !password) {
    return this.renderJSON({
      code: 403,
      message: '用户名或密码错误'
    })
  }

  // 密码md5加密一下
  password = this.helper.md5(password).substring(0, 8)

  var user = yield this.service.member.userInfo(nickname)

  if (!user) {
    return this.renderJSON({
      code: 403,
      message: '用户不存在。'
    })
  } else if (password !== user.password) {
    return this.renderJSON({
      code: 403,
      message: '密码错误。'
    })
  } else {
    // 这里是cookie session，所以不要把整个user放到session里
    this.session['user'] = user.nickname

    return this.renderJSON({
      code: 200
    })
  }
}

// 登出
exports.logout = function*() {
  let referer = formatReferer(this, options.rootPath)
  let user = this.session['user']
  if (!user) {
    return this.unsafeRedirect(referer)
  }

  this.session['user'] = null
  this.unsafeRedirect(referer)
}

// 通用信息
exports.pubInfo = function*() {
  let user = this.session['user']

  this.renderJSON({
    code: 200,
    data: {
      isLogined: !!user,
      csrf: this.csrf
    }
  })
}