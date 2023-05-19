const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coordonateurSchema = new Schema({
    nomComplet: { type: String, required: true },
    courrielContact: { type: String, required: true },
});

module.exports = mongoose.model("Coordonateur", coordonateurSchema);
