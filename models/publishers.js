'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class publishers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      publishers.hasMany(models.books,{
        foreignKey : 'publisher_id',
        as :'booksPublished'
      })
    }
  };
  publishers.init({
    publisher_name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'publishers',
  });
  return publishers;
};