'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsTo(models.publishers,{
        foreignKey : 'publisher_id',
        as: 'publisherDetails'
      })
      books.belongsToMany(models.users, {
        through: 'user_borrowed_books',
        as: 'borrowedUserDetails',
        foreignKey: 'book_id'
      });
    }
  };
  books.init({
    name: DataTypes.STRING,
    edition: DataTypes.STRING,
    isbn: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    total_books: DataTypes.INTEGER,
    publisher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'publishers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'books',
  });
  books.prototype.getTotalAvailableBooks  = function (){
    this.setDataValue('availableBooks', this.total_books - this.borrowedUserDetails.length)
  }
  return books;
};