'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pic', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    picPath: DataTypes.STRING,
    picSize: DataTypes.STRING
  }, {
    tableName: 'pics',
    timestamps: true,
    underscored: false
  })
}