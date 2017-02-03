'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spiderRecord', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    spiderName: DataTypes.STRING,
    url: DataTypes.STRING,
    appId: DataTypes.INTEGER,
    htmlId: DataTypes.INTEGER,
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'spider-record',
    timestamps: true,
    underscored: false
  })
}