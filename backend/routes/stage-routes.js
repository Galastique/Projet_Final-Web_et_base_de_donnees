const express = require("express");
const controllerStage = require("../controllers/stage-controllers");
const router = express.Router();

router.get("/", controllerStage.getStages);
router.get("/:stageId", controllerStage.accederStage);
router.post("/", controllerStage.ajouterStage);
router.patch("/:stageId/modifier", controllerStage.modifierStage);
router.patch("/:stageId/inscrire", controllerStage.accepterEtudiant); //Accepter demande de stage
router.delete("/:stageId", controllerStage.supprimerStage);

module.exports = router;
