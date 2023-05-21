const express = require("express");
const controllerEtudiant = require("../controllers/etudiant-controllers");
const router = express.Router();

router.get("/", controllerEtudiant.getEtudiants);
router.get("/:numeroDA", controllerEtudiant.accederEtudiant);
router.post("/", controllerEtudiant.ajouterEtudiant);
router.patch("/:numeroDA/modifier", controllerEtudiant.modifierEtudiant);
router.patch("/:numeroDA/inscrire", controllerEtudiant.inscrireEtudiant); //Envoyer une demande de stage
router.delete("/:numeroDA", controllerEtudiant.supprimerEtudiant);

module.exports = router;
