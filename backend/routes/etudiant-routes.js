const express = require("express");
const controllerEtudiant = require("../controllers/etudiants-controllers");
const router = express.Router();

router.get("/", controllerEtudiant.getEtudiants);
router.post("/", controllerEtudiant.ajouterEtudiant);
router.get("/:etudiantId", controllerEtudiant.accederEtudiant);
router.patch("/:etudiantId/inscrire", controllerEtudiant.inscrireEtudiant);

module.exports = router;
