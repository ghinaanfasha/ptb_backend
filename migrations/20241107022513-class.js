'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'Class' table with the columns as defined in the struct
     */
    await queryInterface.createTable('Class', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quota: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      topic: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categorys',  // Assuming there's a 'Products' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,  // index for faster querying by class_id
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
      khs: {
        type: Sequelize.TEXT,
        allowNull: true,  // nullable because it can be nil in the struct
      },
      start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('Class');
  }
};
