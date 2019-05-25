const express = require("express");
const router = express.Router();
const validation = require("./validation-routes.js");
const helper = require("../auth/helpers");
const calendarController = require("../controllers/calendarController");

router.get("/calendar", calendarController.index);

module.exports = router;