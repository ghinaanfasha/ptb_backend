"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Definisikan relasi jika diperlukan
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categorys",
      timestamps: false,
    }
  );

  return Category;
}; 