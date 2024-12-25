'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'Orders' table with the columns as defined in the struct
     */
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Assuming there's a 'Users' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        index: true,  // index for faster querying by user_id
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Class',  // Assuming there's a 'Products' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,  // index for faster querying by class_id
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,  // Default value for active status
        allowNull: true,
      },
      // Add this field in the Orders table schema
    file: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('Orders');
  }
};
