'use strict'

module.exports = function(sequelize, DataTypes) {
  let Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tagName: DataTypes.STRING
  }, {
    tableName: 'blog-tags',
    timestamps: true,
    underscored: false
  })
  return Tag
}