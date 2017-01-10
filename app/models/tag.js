'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tag', {
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
}