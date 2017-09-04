'use strict';
module.exports = function(sequelize, DataTypes) {
  var Likes = sequelize.define('Likes', {
    userId: DataTypes.INTEGER,
    messagesId: DataTypes.INTEGER
  }, {});
  'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    messagesId:DataTypes.INTEGER
  }, {});
  likes.associate = function(models){
    likes.belongsTo(models.messages,{foreignKey: 'messagesId', through: 'messages'});
      likes.belongsTo(models.User,{foreignKey: 'userId', through: 'user'});
  };
  return likes;
});
