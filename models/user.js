'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username:DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  User.associate = function(models){
    User.hasMany(models.messages,{as:'messages', foreignKey: 'userId'});
    User.hasMany(models.likes,{as:'likes', foreignKey: 'userId'});

  };
  return User;
};
