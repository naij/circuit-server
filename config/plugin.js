'use strict'

const path = require('path')
const pluginsDir = path.join(__dirname, '../plugins')

exports.static = true

exports.sequelize = {
  enable: true,
  path: path.join(pluginsDir, 'sequelize')
}