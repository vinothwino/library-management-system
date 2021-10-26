'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const {Model} = require('sequelize');


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.addHook('beforeCount', function (options) {
  if (this._scope.include && this._scope.include.length > 0) {
    throw new Error('A "count" operation executed with scope-based inclusions will return an incorrect result')
  }

  if (options.include && options.include.length > 0) {
    options.include = null
  }
})

const toJSON = Model.prototype.toJSON;

Model.prototype.toJSON = function ({attributes = []} = {}) {
    const obj = toJSON.call(this);

    if (!attributes.length) {
      return obj;
    }

    return attributes.reduce((result, attribute) => {
      result[attribute] = obj[attribute];

      return result;
    }, {});
  };
module.exports = db;
