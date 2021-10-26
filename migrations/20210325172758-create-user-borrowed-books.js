'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_borrowed_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      book_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      publisher_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'publishers',
          key: 'id'
        }
      },
      borrowed_date: {
        type: Sequelize.DATE
      },
      due_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_borrowed_books');
  }
};