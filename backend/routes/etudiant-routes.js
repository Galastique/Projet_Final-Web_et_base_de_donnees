const express = require("express");
const controllerEtudiant = require("../controllers/etudiants-controllers");
const router = express.Router();

router.get("/", controllerEtudiant.getEtudiants);
router.post("/", controllerEtudiant.ajouterEtudiant);
router.get("/:etudiantId", controllerEtudiant.accederEtudiant);
router.patch("/:etudiantId/modifier", controllerEtudiant.modifierEtudiant);
router.patch("/:etudiantId/inscrire", controllerEtudiant.inscrireEtudiant);
router.delete("/:etudiantId", controllerEtudiant.supprimerEtudiant);

module.exports = router;
