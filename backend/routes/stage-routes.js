const express = require("express");
const controllerStage = require("../controllers/stage-controllers");
const router = express.Router();

router.get("/", controllerStage.getStages);
router.post("/", controllerStage.ajouterStage);
router.get("/:stageId", controllerStage.accederStage);
router.patch("/:stageId/modifier", controllerStage.modifierStage);
router.delete("/:stageId", controllerStage.supprimerStage);

module.exports = router;
