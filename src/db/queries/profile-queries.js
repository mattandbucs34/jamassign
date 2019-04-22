const Profile = require("../models").Profile;
const User = require("../models").User;
const Authorizer = require("../../policies/application");

module.exports = {
  create(newProfile, callback) {
    return Profile.create({
      firstname: newProfile.firstname,
      middleinitial: newProfile.middleinitial,
      lastname: newProfile.lastname,
      address1: newProfile.address1,
      address2: newProfile.address2,
      city: newProfile.city,
      state: newProfile.state,
      zipcode: newProfile.zipcode,
      homephone: newProfile.homephone,
      mobilephone: newProfile.mobilephone,
      userId: newProfile.userId
    })
    .then((profile) => {
      callback(null, profile);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  getProfile(req, callback) {
    return Profile.findOne({
      where: {
        userId: req.user.id
      },
      include: [{
        model: User
      }]
    })
    .then((profile) => {
      callback(null, profile);
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateProfile(req, updatedProfile, callback) {
    return Profile.findOne({
      where: {
        userId: req.user.id
      }
    })
    .then((profile) => {
      if(!profile) {
        return callback("Profile not found!");
      }

      const authorized = new Authorizer(req.user, profile).update();
      
      if(authorized) {
        profile.update(updatedProfile, {
          fields: Object.keys(updatedProfile)
        })
        .then(() => {
          callback(null, profile);
        })
        .catch((err) => {
          console.log(err);
          callback(err);
        });
      }else {
        req.flash("notice", "You are not authorized to do that!");
        callback("Forbidden");
      }
    });
  }
}