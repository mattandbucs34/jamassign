const express = require("express");
const router = express.Router();
const validation = require("./validation-routes.js");
const userController = require("../controllers/userController");

router.get("/users/register", userController.register);

router.post("/users", validation.validateRegistration, userController.create);
//router.post("/users/register", userController.create);

module.exports = router;