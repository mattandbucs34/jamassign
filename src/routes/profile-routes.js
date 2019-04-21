const express = require("express");
const router = express.Router();
const validation = require("./validation-routes.js");
const profileController = require("../controllers/profileController");

router.get("/profile/new", profileController.new);
router.get("/profile/show", profileController.show);

router.post("/profile/create", profileController.create);

module.exports = router;