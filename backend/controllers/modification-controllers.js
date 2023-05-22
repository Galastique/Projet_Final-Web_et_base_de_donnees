const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const Modification = require("../models/modification");

const saveModification = async (message) => {
    let type = message;

    const dateCourante = new Date();
    let date = dateCourante.toUTCString();

    let nouvelleModification = new Modification({ date, type });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await nouvelleModification.save();
        await session.commitTransaction();
    } catch {
        return next(new HttpErreur("La création de la modification a échouée", 500));
    }
};

const getModifications = async (requete, reponse, next) => {
    let modifications;

    try {
        modifications = await Modification.find({}).sort("-date");
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération des modifications", 500));
    }

    reponse.json({modifications: modifications.map((modification) => modification.toObject({getters: true}))});
}

exports.saveModification = saveModification;
exports.getModifications = getModifications;