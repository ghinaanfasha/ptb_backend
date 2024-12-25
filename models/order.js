"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      Order.belongsTo(models.Class, {
        foreignKey: "class_id",
        as: "class",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Class",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      // Add this field in the Order.init() attributes
      file: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      timestamps: false,
    }
  );

  return Order;
};
