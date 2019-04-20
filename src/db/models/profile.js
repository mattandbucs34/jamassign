'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleinitial: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    homephone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobilephone: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Profile;
};