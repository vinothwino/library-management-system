'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      edition: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      total_books: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      publisher_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'publishers',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};