'use strict'

/**
 * sequelize 初始化
 */


/**
 * Module dependencies.
 */
let fs = require('fs')
let path = require('path')
let chalk = require('chalk')
let Sequelize = require('sequelize')

module.exports = app => {
  let config = app.config.database
  let sequelize = new Sequelize(
    config.database,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
      host: config.host,
      dialect: config.dialect,
      port: config.port,
      logging: function(msg) {
        app.logger.info(chalk.green(msg))
      }
    }
  )
  let models = {sequelize}
  let modelsPath = path.join(app.baseDir, 'app/models')

  fs.readdir(modelsPath, (err, files) => {
    files.forEach(file => {
      let filePath = path.join(modelsPath, file)
      let model = sequelize['import'](filePath)
      models[model.name] = model
    })
  })

  Object.defineProperty(app.context, 'models', {
    get: function() {
      return models
    }
  })
}