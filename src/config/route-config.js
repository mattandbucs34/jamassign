module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/user-routes");
    const profileRoutes = require("../routes/profile-routes");
    const announceRoutes = require("../routes/announce-routes");
    const calendarRoutes = require("../routes/calendar-routes");
   
    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(profileRoutes);
    app.use(announceRoutes);
    app.use(calendarRoutes);
  }
}