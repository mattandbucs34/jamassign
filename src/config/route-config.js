module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/user-routes");
    const profileRoutes = require("../routes/profile-routes");
    const announceRoutes = require("../routes/announce-routes");
   
    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(profileRoutes);
    app.use(announceRoutes);
  }
}