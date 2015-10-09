//Models for Note entity

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define('Note', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { 
        len: [2,30] //validation min 2, max 30 chars
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { 
        len: [2,50] //validation min 2, max 50 chars
      }
    },
  });
  return Note; //Return our model
};