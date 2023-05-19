const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stageSchema = new Schema({
    nomPersonneContact: { type: String, required: true },
    courrielPersonneContact: { type: String, required: true },
    telephonePersonneContact: { type: String, required: true },
    nomEntreprise: { type: String, required: true },
    adresseEntreprise: { type: String, required: true },
    typeStage: { type: String, required: true },
    nbrPostesDisponibles: { type: Int32, required: true },
    descriptionStage: { type: String, required: true },
    renumeration: { type: Float32Array, required: true },
    etudiantsInscrits: [{ type: mongoose.Types.ObjectId, required: false, ref: "Etudiant" }],
});

module.exports = mongoose.model("Stage", stageSchema);
