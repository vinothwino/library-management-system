'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_borrowed_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_borrowed_books.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
      user_borrowed_books.belongsTo(models.books, {
        foreignKey: 'book_id'
      })
      user_borrowed_books.belongsTo(models.publishers, {
        foreignKey: 'publisher_id'
      })
    }
  };
  user_borrowed_books.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    publisher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'publishers',
        key: 'id'
      }
    },
    borrowed_date: {
      type: DataTypes.DATE
    },
    due_date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'user_borrowed_books',
  });
  return user_borrowed_books;
};