"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, 
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      nim: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Add this field in User.init
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // Nama tabel di database
      timestamps: false, // Karena kita menggunakan timestamp dalam format Unix manual, kita set ini ke false
    }
  );

  return User;
};
