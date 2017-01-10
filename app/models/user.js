'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: false
  })
}