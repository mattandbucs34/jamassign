module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/user-routes");
    
    app.use(staticRoutes);
    app.use(userRoutes);
  }
}