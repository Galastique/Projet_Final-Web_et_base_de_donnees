const express = require("express");
const controllerUtilisateur = require("../controllers/utilisateur-controllers");
const router = express.Router();

router.post("/inscription", controllerUtilisateur.inscription);
router.post("/connexion", controllerUtilisateur.connexion);

module.exports = router;
