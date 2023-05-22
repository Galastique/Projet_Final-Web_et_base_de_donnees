const express = require("express");
const controllersModification = require("../controllers/modification-controllers");
const router = express.Router();

router.get("/", controllersModification.getModifications);

module.exports = router;