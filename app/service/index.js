'use strict'

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
        console.log(chalk.green(msg))
      }
    }
  )
  let models = {sequelize}

  fs.readdir(path.join(__dirname, '../models'), (err, files) => {
    files.forEach(file => {
      let model = sequelize['import'](path.join(__dirname, '../models', file))
      models[model.name] = model
    })

    Object.keys(models).forEach(modelName => {
      if ('associate' in models[modelName]) {
        models[modelName].associate(models)
      }
    })
  })

  Object.defineProperty(app, 'models', {
    get: function() {
      return models
    }
  })
}
