const userQueries = require("../db/queries/user-queries");
const passport = require("passport");
const Authorizer = require("../policies/userPolicy");
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
          req.flash("success", "You've successfully registered!");
          res.redirect("/profile/new");
        });
      }
    });
  },

  signInForm(req, res, next) {
    res.render("users/sign-in");
  },

  signIn(req, res, next) {
    passport.authenticate("local")(req, res, () => {
      if(!req.user) {
        req.flash("notice", "Sign in failed. Please try again");
        res.redirect("users/sign-in");
      }else {
        //console.log("success: sign in successful");
        req.flash("success", "You have successfully signed in!");
        res.redirect("/announcements");
      }
    });
  },

  signOut(req, res, next) {
    req.logout();
    req.flash("success", "You have been logged out");
    res.redirect("/");
  },
  
  show(req, res, next) {
    
  },
  
  changeRole(req, updatedUser, next) {
    
  }
}