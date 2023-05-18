const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    numeroDA: { type: String, required: true },
    nom: { type: String, required: true },
    courriel: { type: String, required: true },
    profilSortie: { type: String, required: true }
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
