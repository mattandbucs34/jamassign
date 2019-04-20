const Profile = require("../models").Profile;
const User = require("../models").User;
const Authorizer = require("../../policies/application");

module.exports = {
  create(profile, callback) {
    return Profile.create({
      firstname: req.body.firstName,
      middleinitial: req.body.midInitial,
      lastname: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.userState,
      zipcode: req.body.zipCode,
      homenumber: req.body.homeNumber,
      mobilenumber: req.body.mobileNumber
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  }
}