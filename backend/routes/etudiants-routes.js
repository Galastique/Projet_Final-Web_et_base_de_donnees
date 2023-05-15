const express = require("express");

const controleursEtudiants = require("../controllers/etudiants-controllers");
const router = express.Router();

//TEMPLATE FILE, PLEASE EDIT CORRECTLY
router.get("/", controleursEtudiants.getEtudiants);
router.post("/", controleursEtudiants.ajouterEtudiant);
router.get("/:etudiantId", controleursEtudiants.accederEtudiant);
router.patch("/:etudiantId", controleursEtudiants.modifierEtudiant);
router.delete("/:etudiantId", controleursEtudiants.supprimerEtudiant);
router.patch("/:etudiantId/inscrire", controleursEtudiants.inscrireEtudiant);

module.exports = router;
