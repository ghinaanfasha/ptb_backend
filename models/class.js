"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      Class.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Class.hasMany(models.Order, {
        foreignKey: 'class_id',
        as: 'orders'
      });

      Class.belongsTo(models.Class, {
        foreignKey: "category_id",
        as: "category",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  Class.init(
    {
      quota: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Categorys',  // Assuming there's a 'Products' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,  // index for faster querying by class_id
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      khs: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Class",
      tableName: "Class",
      timestamps: false,
    }
  );

  return Class;
}; 