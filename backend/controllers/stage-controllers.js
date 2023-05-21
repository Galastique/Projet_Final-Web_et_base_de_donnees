const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const getStages = async (request, response, next) => {
    let stages;

    try {
        stages = await Stage.find({}).populate("etudiantsInscrits");
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération des stages", 500));
    }

    response.json({stages: stages.map((stage) => stage.toObject({getters: true}))});
};

const accederStage = async (request, response, next) => {
    const stageId = request.params.stageId;

    let stage;
    try {
        stage = await Stage.findById(stageId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
    }

    if (!stage) {
        return next(new HttpErreur("Il n'y a pas de stage pour l'ID donné", 404));
    }

    response.json({ stage: stage.toObject({ getters: true }) });
};

const ajouterStage = async (request, response, next) => {
    let { nomPersonneContact, courrielPersonneContact, telephonePersonneContact, nomEntreprise, adresseEntreprise, typeStage, nbrPostesDisponibles, descriptionStage, remuneration } = request.body;
    
    if (!nomPersonneContact || !courrielPersonneContact || !telephonePersonneContact) {
        return next(new HttpErreur("Vous devez spécifier les informations de contact pour le stage", 422));
    }

    if (!courrielPersonneContact.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return next(new HttpErreur("Vous devez spécifier un courriel de contact valide", 422));
    }

    if (!nomEntreprise || !adresseEntreprise) {
        return next(new HttpErreur("Vous devez spécifier les informations de l'entreprise", 422));
    }

    if (!typeStage || (typeStage.toLowerCase() != "réseaux et sécurité" && typeStage.toLowerCase() != "développement d'applications")) {
        return next(new HttpErreur("Vous devez spécifier un type de stage valide", 422));
    } else {
        typeStage = typeStage.toLowerCase();
    }

    if (!nbrPostesDisponibles) {
        return next(new HttpErreur("Vous devez spécifier le nombre de postes disponibles pour le stage", 422));
    }

    if (!descriptionStage) {
        return next(new HttpErreur("Vous devez spécifier une description pour le stage", 422));
    }

    if (!remuneration || isNaN(remuneration)) {
        return next(new HttpErreur("Vous devez spécifier une rénumération valide pour le stage. (0 = non-rémunéré, 15.25 à 50 = taux horaire, plus de 50 = paiement fixe)", 422));
    }

    try {
        stageExiste = await Stage.findOne({ nomEntreprise: nomEntreprise, typeStage: typeStage, descriptionStage: descriptionStage });
    } catch {
        return next(new HttpErreur("Échec vérification existance stage", 500));
    }

    if (stageExiste) {
        return next(new HttpErreur("Ce stage existe déjà!", 422))
    }


    let nouveauStage = new Stage({ nomPersonneContact, courrielPersonneContact, telephonePersonneContact, nomEntreprise, adresseEntreprise, typeStage, nbrPostesDisponibles, descriptionStage, renumeration: remuneration });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await nouveauStage.save();
        await session.commitTransaction();
    } catch {
        return next(new HttpErreur("La création du stage a échouée", 500));
    }

    response.status(201).json({ stage: nouveauStage });
};

const modifierStage = async (request, response, next) => {
    const { nomPersonneContact, courrielPersonneContact, telephonePersonneContact, nomEntreprise, adresseEntreprise, typeStage, nbrPostesDisponibles, descriptionStage, renumeration } = request.body;
    const stageId = request.params.stageId;

    if (!nomPersonneContact && !courrielPersonneContact && !telephonePersonneContact && !nomEntreprise && !adresseEntreprise && !typeStage && !nbrPostesDisponibles && !descriptionStage && !renumeration) {
        return next(new HttpErreur("Vous devez spécifier au moins un élément à modifier", 422));
    }

    if (courrielPersonneContact && !courrielPersonneContact.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return next(new HttpErreur("Vous devez spécifier un courriel de contact valide", 422));
    }

    if (typeStage && (typeStage.toLowerCase() != "réseaux et sécurité" && typeStage.toLowerCase() != "développement d'application")) {
        return next(new HttpErreur("Vous devez spécifier un type de stage valide", 422));
    }

    if (renumeration && isNaN(renumeration)) {
        return next(new HttpErreur("Vous devez spécifier une rénumération valide pour le stage. (0 = non-rémunéré, 15.25 à 50 = taux horaire, plus de 50 = paiement fixe)", 422));
    }

    let stage;
    try {
        stage = await Stage.findById(stageId);
        //Don't worry guys, this part only changes the elements that were specified in the patch query
        nomPersonneContact && (stage.nomPersonneContact = nomPersonneContact);
        courrielPersonneContact && (stage.courrielPersonneContact = courrielPersonneContact);
        telephonePersonneContact && (stage.telephonePersonneContact = telephonePersonneContact);
        nomEntreprise && (stage.nomEntreprise = nomEntreprise);
        adresseEntreprise && (stage.adresseEntreprise = adresseEntreprise);
        typeStage && (stage.typeStage = typeStage);
        nbrPostesDisponibles && (stage.nbrPostesDisponibles = nbrPostesDisponibles);
        descriptionStage && (stage.descriptionStage = descriptionStage);
        renumeration && (stage.renumeration = renumeration);
        await stage.save();
    } catch {
        return next(new HttpErreur("La modification du stage a échouée", 500));
    }

    response.status(200).json({ stage: stage.toObject({ getters: true }) });
};

const supprimerStage = async (request, response, next) => {
    const stageId = request.params.stageId;

    let stage;
    try {
        stage = await Stage.findById(stageId);
    } catch {
        return next(new HttpErreur("L'ID fourni pour le stage est invalide", 500));
    }

    if (!stage) {
        return next(new HttpErreur("Il n'y a pas de stage pour l'ID donné", 404));
    }

    let etudiants = [];
    try {
        let tousEtudiants = await Etudiant.find();
        for (let etudiant of tousEtudiants) {
            if (etudiant.stageAssocie == stageId) {
                etudiants.push(etudiant);
            }
        }
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de la liste de tous les étudiants qui ont le stage", 500));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await stage.deleteOne();
        for (let etudiant of etudiants) {
            etudiant.stageAssocie = null;
            await etudiant.save();
        };

        await session.commitTransaction();
    } catch {
        return next(new HttpErreur("La suppression du stage a échoué", 500));
    }

    response.status(200).json({ message: "Le stage a été supprimé" });
};

exports.getStages = getStages;
exports.accederStage = accederStage;
exports.ajouterStage = ajouterStage;
exports.modifierStage = modifierStage;
exports.supprimerStage = supprimerStage;
