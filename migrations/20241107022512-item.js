'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'Items' table with the columns as defined in the struct
     */
    await queryInterface.createTable('Items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true, 
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
      image: {
        type: Sequelize.TEXT,
        allowNull: true,  // nullable because it can be nil in the struct
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('Items');
  }
};
