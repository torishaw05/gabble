'use strict';
module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define('Messages', {
    title: DataTypes.STRING,
    text: DataTypes.STRING(140),
    likey: DataTypes.INTEGER
  }, {});
  'use strict';
module.exports = function(sequelize, DataTypes) {
  var messages = sequelize.define('messages', {
    title: DataTypes.STRING,
    text: DataTypes.STRING(140),
    likey: DataTypes.INTEGER,
  }, {});
  messages.associate = function(models){
    messages.belongsTo(models.User,{foreignKey: 'userId', through: 'create_new_table'});
    messages.hasMany(models.likes,{as:'likes', foreignKey: 'messageId'});
  };

  return messages;
};
