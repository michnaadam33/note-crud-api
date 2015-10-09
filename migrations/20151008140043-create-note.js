//migration for note table - sequelize-cli
//Use:
//./node_modules/sequelize-cli/bin/sequelize db:migrate

'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.TEXT //because sqlite don't have date type
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.TEXT //because sqlite don't have date type
      }
    });
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('Notes');
  }
};