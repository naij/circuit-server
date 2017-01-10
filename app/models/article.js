'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    tag: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    markdown: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {
    tableName: 'blog-articles',
    timestamps: true,
    underscored: false
  })
}