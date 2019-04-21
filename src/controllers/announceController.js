const announceQueries = require("../db/queries/announce-queries");
const Authorizer = require("../policies/announcements");

module.exports = {
  index(req, res, next) {
    // announceQueries.getAnnouncements((err, announcements) => {
    //   if(err) {
    //     res.redirect(500, "static/index");
    //   }else {
    //     res.render("announcements/index", {announcements});
    //   }
    // });
    res.render("announcements/index")
  }
}