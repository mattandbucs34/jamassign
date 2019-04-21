const express = require("express");
const router = express.Router();
const validation = require("./validation-routes.js");
const announceController = require("../controllers/announceController");

router.get("/announcements", announceController.index);

module.exports = router;