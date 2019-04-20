const profileQueries = require("../db/queries/profile-queries");
const Authorizer = require("../policies/application");
module.exports = {
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      res.render("profile/new");
    } else {
      req.flash("notice", "You are not authorized do that");
      res.redirect("/users/register");
    }
    
  },

  create(req, res, next) {
    let userProfile = {
      firstname: req.body.firstName.trim(),
      middleinitial: req.body.midInitial.trim(),
      lastname: req.body.lastName.trim(),
      address1: req.body.address1.trim(),
      address2: req.body.address2.trim(),
      city: req.body.city.trim(),
      state: req.body.userState,
      zipcode: req.body.zipCode,
      homenumber: req.body.homeNumber,
      mobilenumber: req.body.mobileNumber
    }

    profileQueries.create(userProfile, (err, profile) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/profile/new");
      }else {
        req.flash("success", "Your profile is set up and you are now a member!");
        res.redirect("/");
      }
    });
  }
}