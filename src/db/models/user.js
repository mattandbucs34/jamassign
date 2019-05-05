'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: "must be a valid email"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "official"
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: "userId",
      as: "profile"
    });
  };

  User.prototype.isAdmin = () => {
    return this.role = "admin";
  };

  User.prototype.isCoordinator = () => {
    return this.role = "coordinator";
  };
  
  return User;
};