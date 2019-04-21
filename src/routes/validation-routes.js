module.exports = {
  validateRegistration(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("username", "must be at least 8 characters").isLength({min: 8});
      req.checkBody("email", "must be a valid email address").isEmail();
      req.checkBody("password", "must be at least 8 characters").isLength({min: 8});
      req.checkBody("confirmPW", "must match entered password").optional().matches(req.body.password);
    }

    const errors = req.validationErrors();

    if(errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  },

  validateSignIn(req, res, next) {
    if(req.method === "POST") {
      req.checkBody("username", "must be at least 6 characters in length").isLength({min: 6});
      req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
    }

    const errors = req.validationErrors();

    if(errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    }else {
      return next();
    }
  }
}