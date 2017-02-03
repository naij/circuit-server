'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spiderApp', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    domain: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    tableName: 'spider-app',
    timestamps: true,
    underscored: false
  })
}