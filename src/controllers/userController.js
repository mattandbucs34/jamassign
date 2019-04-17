const userQueries = require("../db/user-queries");
const passport = require("passport");
//const sendMail = require("@sendgrid/mail");


module.exports = {
  register(req, res, next) {
    res.render("users/register");
  },

  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.confirmPW
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/");
      }else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully registered!");
          res.redirect("/");
        });
      }
    });
  }
}