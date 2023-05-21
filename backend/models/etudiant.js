const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    numeroDA: { type: String, required: true },
    nomComplet: { type: String, required: true },
    courrielContact: { type: String, required: true },
    profilSortie: { type: String, required: true },
    stageAssocie: { type: mongoose.Types.ObjectId, required: false, ref: "Stage" },
    demandesStage: [{ type: mongoose.Types.ObjectId, required: false, ref: "Stage" }]
});

module.exports = mongoose.model("Etudiant", etudiantSchema);
