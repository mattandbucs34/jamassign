'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schools = sequelize.define('Schools', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Schools.associate = function(models) {
    // associations can be defined here
  };
  return Schools;
};