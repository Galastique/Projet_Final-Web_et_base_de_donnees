const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modificationSchema = new Schema({
    date: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model("Modification", modificationSchema);
