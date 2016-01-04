"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Profile", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    job_title: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    contact_email: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Profile.belongsTo(models.User)
      }
    }
  });

  return Profile;
};
