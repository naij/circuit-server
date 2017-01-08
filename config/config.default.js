/**
 * 项目默认配置
 **/

exports.host = 'localhost:7002'

exports.cdn = '/public'

exports.siteFile = {
  '/favicon.ico': '/public/favicon.ico',
}

/**
 * 日志级别
 */
exports.logger = {
  consoleLevel: 'DEBUG'
}

/**
 * session配置
 */
exports.session = {
  store: 'cookie',
  maxAge: 365 * 24 * 3600 * 1000
}

/**
 * 数据库信息
 */
exports.database = {
  database: 'ueqir',
  host: '127.0.0.1',
  dialect: 'mysql',
  port: '3306'
}

/**
 * 404页面配置
 */
exports.notfound = {
  pageUrl: '/404',
  enableRedirect: true,
}

/**
 * 登陆校验中间件
 */
exports.auth = {
  unInterceptUrls: [
    '/api/pubinfo.json',
    '/api/login.json',
    '/api/logout.json',
  ]
}

/**
 * 加载的中间件
 */
exports.middleware = [
  'auth',
  'logger'
]