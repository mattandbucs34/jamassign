const schoolQueries = require("../db/queries/school-queries");

module.exports = {
  new(req, res, next) {
    res.render('schools/new');
  },
  
  addSchool(req, res, next) {
    let newSchool = {
      schoolName: req.body.schoolName,
      address: req.body.schoolAddress,
      city: req.body.schoolCity,
      state: req.body.schoolState,
      zip: req.body.schoolZip
    };

    schoolQueries.createSchool(newSchool, (err, school) => {
      if(err) {
        req.flash("error", err);
        res.redirect('/');
      }else {
        req.flash("success", "You added a new school");
        res.redirect("/schools/show");
      }
    });
  }
}