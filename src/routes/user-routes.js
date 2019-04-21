const express = require("express");
const router = express.Router();
const validation = require("./validation-routes.js");
const userController = require("../controllers/userController");

router.get("/users/register", userController.register);
router.get("/users/sign-in", userController.signInForm);
router.get("/users/sign-out", userController.signOut);

router.post("/users", validation.validateRegistration, userController.create);
router.post("/users/sign-in", validation.validateSignIn, userController.signIn);
//router.post("/users/register", userController.create);

module.exports = router;