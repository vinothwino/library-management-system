'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_roles.belongsTo(models.roles, {
        foreignKey: 'role_id',
        targetKey : 'id',
        as: 'roles'
      });
      user_roles.belongsTo(models.users, {
        foreignKey: 'user_id',
        targetKey : 'id',
        as: 'profile'
      });
    }
  };
  user_roles.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'user_roles',
  });
  return user_roles;
};