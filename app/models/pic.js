'use strict'

module.exports = function(sequelize, DataTypes) {
  let Pic = sequelize.define('Pic', {
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
  return Pic
}