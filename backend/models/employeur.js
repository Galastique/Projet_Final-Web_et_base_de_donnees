const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeurSchema = new Schema({
    nomComplet: { type: String, required: true },
    courrielContact: { type: String, required: true },
});

module.exports = mongoose.model("Employeur", employeurSchema);
