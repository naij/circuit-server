'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spiderHTML', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: DataTypes.STRING,
    html: DataTypes.STRING,
    appId: DataTypes.INTEGER
  }, {
    tableName: 'spider-html',
    timestamps: true,
    underscored: false
  })
}