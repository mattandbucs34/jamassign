'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users",
      "role",
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "official"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColum("Users", "role");
  }
};
