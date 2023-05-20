const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const utilisateurSchema = new Schema({
    nom: { type: String, required: true },
    courriel: { type: String, required: true },
    motDePasse: { type: String, required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
