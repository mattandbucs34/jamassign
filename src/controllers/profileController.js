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
      homephone: req.body.homeNumber,
      mobilephone: req.body.mobileNumber,
      userId: req.user.id
    }

    profileQueries.create(userProfile, (err, profile) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/profile/new");
      }else {
        req.flash("success", "Your profile is set up and you are now a member!");
        res.redirect("/announcements");
      }
    });
  },

  show(req, res, next) {
    const authorized = new Authorizer(req.user).show();

    if(authorized) {
      profileQueries.getProfile(req, (err, profile) => {
        if(err || profile === null) {
          res.redirect(404, "/announcements");
        }else {
          res.render("profile/show", {profile});
        }
      });
    }else {
      req.flash("notice", "You are not the correct user to make these changes");
      res.redirect("profile/show");
    }
  },

  edit(req, res, next) {
    profileQueries.getProfile(req, (err, profile) => {
      if(err || profile === null) {
        res.redirect(404, "/");
      }else {
        const authorized = new Authorizer(req.user, profile).edit();

        if(authorized) {
          //req.flash("error", "You are about to edit your profile.\nPlease proceed with caution!");
          res.render("profile/edit", {profile});
        }else {
          req.flash("notice", "You need to ask permission to do that!");
          res.render("profile/show", {profile});
        }
      }
    });    
  },

  update(req, res, next) {
    profileQueries.updateProfile(req, req.body, (err, profile) => {
      if(err || profile === null) {
        res.redirect(404, "/profile/edit");
      }else {
        res.redirect("/profile/show");
      }
    });
  }
}