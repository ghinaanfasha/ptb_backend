"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BankSoal extends Model {
    static associate(models) {
      BankSoal.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      
      BankSoal.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  BankSoal.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "BankSoal",
      tableName: "BankSoal",
      timestamps: false,
    }
  );

  return BankSoal;
};
