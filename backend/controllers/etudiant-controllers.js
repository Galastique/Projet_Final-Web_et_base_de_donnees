const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const controllerModification = require("./modification-controllers");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const getEtudiants = async (requete, reponse, next) => {
    let etudiants;

    try {
        etudiants = await Etudiant.find({}).populate("stageAssocie");
    } catch {
        return next(new HttpErreur("Erreur accès étudiant", 500));
    }

    reponse.json({ etudiants: etudiants.map(etudiant => etudiant.toObject({ getters: true })) });
};

const ajouterEtudiant = async (requete, reponse, next) => {
    let { numeroDA, nomComplet, courrielContact, profilSortie } = requete.body;
    let etudiantExiste;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier le numero DA de l'étudiant", 422));
    }

    if (!nomComplet) {
        return next(new HttpErreur("Vous devez spécifier le nom complet de l'étudiant", 422));
    }

    if (!courrielContact || !courrielContact.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return next(new HttpErreur("Vous devez spécifier un courriel de contact valide pour l'étudiant", 422));
    }

    if (!profilSortie || (profilSortie.toLowerCase() != "développement d'applications" && profilSortie.toLowerCase() != "réseaux et sécurité")) {
        return next(new HttpErreur("Vous devez spécifier un profil de sortie valide pour l'étudiant", 422));
    } else {
        profilSortie = profilSortie.substring(0, 1).toUpperCase() + profilSortie.substring(1).toLowerCase();
    }

    try {
        etudiantExiste = await Etudiant.findOne({ numeroDA: numeroDA});
    } catch {
        return next(new HttpErreur("Échec vérification existance étudiant", 500));
    }

    if (etudiantExiste) {
        return next(new HttpErreur("Étudiant existe déjà!", 422))
    }


    let nouvelEtudiant = new Etudiant({ numeroDA, nomComplet, courrielContact, profilSortie });
    try {
        await nouvelEtudiant.save();
    } catch {
        return next(new HttpErreur("Erreur lors de l'ajout de l'étudiant", 422))
    }

    reponse.status(201).json({ etudiant: nouvelEtudiant.toObject({ getter: true }) });
    controllerModification.saveModification("controllerEtudiant.ajouterEtudiant");
}

const accederEtudiant = async (requete, reponse, next) => {
    const numeroDA = requete.params.numeroDA;
    let etudiant;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier un numéro DA d'étudiant", 404));
    }

    try {
        etudiant = await Etudiant.findOne({ numeroDA: numeroDA });
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour le DA donné", 404));
    }

    reponse.json({ cours: etudiant.toObject({ getters: true }) });
}

const modifierEtudiant = async (requete, reponse, next) => {
    const numeroDA = requete.params.numeroDA;
    const { nomComplet, courrielContact } = requete.body;

    if (!numeroDA) {
        return next(
            new HttpErreur("Vous devez spécifier le numéro DA de l'étudiant", 422)
        )
    }

    if (!nomComplet && !courrielContact) {
        return next(
            new HttpErreur("Vous devez spécifier le nouveau nom complet ou le nouveau courriel de l'étudiant", 422)
        )
    }

    let etudiant;
    try {
        etudiant = await Etudiant.findOne({ numeroDA: numeroDA });
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour le DA donné", 404));
    }

    try {
        nomComplet && (etudiant.nomComplet = nomComplet);
        courrielContact && (etudiant.courrielContact = courrielContact);
        await etudiant.save();
    } catch {
        return next(new HttpErreur("La modification de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ cours: etudiant.toObject({ getters: true }) });
    controllerModification.saveModification("controllerEtudiant.modifierEtudiant");
}

const supprimerEtudiant = async (requete, reponse, next) => {
    const numeroDA = requete.params.numeroDA;
    let etudiant, stage;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier un numéro DA d'étudiant", 404));
    }

    try {
        etudiant = await Etudiant.findOne({ numeroDA: numeroDA });
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour le numéro DA donné", 404));
    }

    //Removes student from internship
    if (etudiant.stageAssocie){
        try {
            stage = await Stage.findOne({ etudiantsInscrits: etudiant.id });
        } catch {
            return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
        }
        
        if (!stage) {
            return next(new HttpErreur("Aucun stage trouvé pour l'étudiant donné", 404));
        }

        try {
            for(let e of stage.etudiantsInscrits){
                if (e == etudiant.id) {
                    stage.etudiantsInscrits.splice(stage.etudiantsInscrits.indexOf(e), 1);
                }
            }
            await stage.save();
        } catch {
            return next(new HttpErreur("Erreur lors de la mise à jour du stage", 500));
        }
    }

    //Deletes student from database
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        //Removes internship requests from internships
        let tousStages = await Stage.find({});
        for (let stage of tousStages) {
            stage.demandesStage.splice(stage.demandesStage.indexOf(etudiant.id), 1);
            await stage.save();
        }

        await etudiant.deleteOne();
        await session.commitTransaction();
    } catch {
        return next(new HttpErreur("La suppression de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ message: "L'étudiant a été supprimé avec succès" });
    controllerModification.saveModification("controllerEtudiant.supprimerEtudiant");
}

const inscrireEtudiant = async (requete, reponse, next) => {
    const numeroDA = requete.params.numeroDA;
    const { stageId } = requete.body;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier un DA d'étudiant", 404));
    }

    if (!stageId) {
        return next(new HttpErreur("Vous devez spécifier un ID de stage", 404));
    }

    let etudiant;
    try {
        etudiant = await Etudiant.findOne({ numeroDA: numeroDA });
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour le DA donné", 404));
    }

    if (etudiant.stageAssocie) {
        return next(new HttpErreur("L'étudiant spécifié est déjà associé à un stage", 404));
    }

    let stage;
    try {
        stage = await Stage.findById(stageId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
    }

    if (!stage) {
        return next(new HttpErreur("Aucun stage trouvé pour l'ID donné"), 504);
    }

    if (stage.etudiantsInscrits.indexOf(numeroDA) != -1) {
        return next(new HttpErreur("L'étudiant spécifié participe déjà au stage"), 504);
    }

    if (stage.etudiantsInscrits.length >= stage.nbrPostesDisponibles) {
        return next(new HttpErreur("Le stage est déjà complet!"), 504);
    }

    let demandeStage;
    try {
        demandeStage = await Etudiant.findOne({ numeroDA: numeroDA, demandesStage: stageId });
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de la liste de demandes de stage de l'étudiant", 500));
    }

    if (demandeStage) {
        return next(new HttpErreur("L'étudiant spécifié a déjà envoyé une demande à ce stage!"), 504);
    }

    try {
        etudiant.demandesStage.push(stageId);
        stage.demandesStage.push(etudiant.id);
        await etudiant.save();
        await stage.save();
    } catch {
        return next(new HttpErreur("Erreur lors de la mise à jour de l'étudiant", 500));
    }

    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
    controllerModification.saveModification("controllerEtudiant.inscrireEtudiant");
}

exports.getEtudiants = getEtudiants;
exports.ajouterEtudiant = ajouterEtudiant;
exports.accederEtudiant = accederEtudiant;
exports.modifierEtudiant = modifierEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;
exports.inscrireEtudiant = inscrireEtudiant;