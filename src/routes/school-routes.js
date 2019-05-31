const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolControllers");

router.get("/schools/new", schoolController.new);

module.exports = router;