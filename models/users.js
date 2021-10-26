'use strict';
const {
  Model
} = require('sequelize');
var bcrypt = require('bcryptjs');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const jwt = require('jsonwebtoken')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsToMany(models.roles, {
        through: 'user_roles',
        as: 'roles',
        foreignKey: 'user_id'
      })
      users.belongsToMany(models.books, {
        through: 'user_borrowed_books',
        as: 'borrowedBooks',
        foreignKey: 'user_id'
      });
    }
  };
  users.init({
    name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    mobile_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    },

  }, {
    sequelize,
    modelName: 'users',

  });
  users.prototype.checkIsValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  users.prototype.generateToken = function () {
    let token = jwt.sign({ id: this.id, email: this.email, mobile_number: this.mobile_number }, config.JWT_SECRET)
    this.setDataValue('password', undefined)
    this.setDataValue('token', token)
  }
  return users;
};