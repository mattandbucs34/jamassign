const userQueries = require("../db/queries/user-queries");
const passport = require("passport");
//const sendMail = require("@sendgrid/mail");


module.exports = {
  register(req, res, next) {
    res.render("users/register");
  },

  create(req, res, next) {
    let newUser = {
      username: req.body.username.trim(),
      email: req.body.email.trim(),
      password: req.body.password,
      passwordConfirm: req.body.confirmPW
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/users/register");
      }else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully registered!");
          res.redirect("/profile/new");
        });
      }
    });
  },

  profile(req, res, next) {
    res.render("users/profile")
  },

  addProfile(req, res, next) {
    let newProfile = {
      firstname: req.body.firstName,
      middleinitial: req.body.midInitial,
      lastname: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.userState,
      zipcode: req.body.zipCode,
      homephone: req.body.homePhone,
      mobilephone: req.body.mobilePhone
    }

    
  }
}