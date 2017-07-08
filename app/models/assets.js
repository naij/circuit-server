'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sha: DataTypes.STRING,
    appName: DataTypes.STRING,
    refName: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'assets',
    timestamps: true,
    underscored: false
  })
}