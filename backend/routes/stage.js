const express = require("express");
const controllerStage = require("../controllers/stages-controllers");
const router = express.Router();

router.get("/", controllerStage.getStages);
router.post("/", controllerStage.ajouterStage);
router.get("/:stageId", controllerStage.accederStage);

module.exports = router;
