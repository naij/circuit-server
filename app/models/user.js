'use strict'

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
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
  return User
}