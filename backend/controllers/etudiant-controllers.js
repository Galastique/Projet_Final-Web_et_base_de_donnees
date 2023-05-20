const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const getEtudiants = async (requete, reponse, next) => {
    let etudiants;

    try {
        etudiants = await Etudiant.find({});
    } catch {
        return next(new HttpErreur("Erreur accès étudiant", 500));
    }

    reponse.json({ etudiants: etudiants.map(etudiant => etudiant.toObject({ getters: true })) });
};

const ajouterEtudiant = async (requete, reponse, next) => {
    const { numeroDA, nom, courriel, profilSortie } = requete.body;
    let etudiantExiste;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier le numero DA de l'étudiant", 422));
    }

    if (!nom) {
        return next(new HttpErreur("Vous devez spécifier le nom complet de l'étudiant", 422));
    }

    if (!courriel || !courriel.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return next(new HttpErreur("Vous devez spécifier un courriel de contact valide pour l'étudiant", 422));
    }

    if (!profilSortie || (profilSortie.toLowerCase() != "développement d'applications" && profilSortie.toLowerCase() != "réseaux et sécurité")) {
        return next(new HttpErreur("Vous devez spécifier un profil de sortie valide pour l'étudiant", 422));
    }

    try {
        etudiantExiste = await Etudiant.findOne({ numeroDA: numeroDA});
    } catch {
        return next(new HttpErreur("Échec vérification existance étudiant", 500));
    }

    if (etudiantExiste) {
        return next(new HttpErreur("Étudiant existe déjà!", 422))
    }

    let nouvelEtudiant = new Etudiant({ numeroDA, nom, courriel, profilSortie });
    try {
        await nouvelEtudiant.save();
    } catch {
        return next(new HttpErreur("Erreur lors de l'ajout de l'étudiant", 422))
    }

    reponse.status(201).json({ etudiant: nouvelEtudiant.toObject({ getter: true }) });
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
    const { nom } = requete.body;

    if (!numeroDA) {
        return next(
            new HttpErreur("Vous devez spécifier le numéro DA de l'étudiant", 422)
        )
    }

    if (!nom) {
        return next(
            new HttpErreur("Vous devez spécifier le nouveau nom complet de l'étudiant", 422)
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
        etudiant.nom = nom;
        await etudiant.save();
    } catch {
        return next(new HttpErreur("La modification de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ cours: etudiant.toObject({ getters: true }) });
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

    //This part right here removes the student from the list of students in the internship element
    if (etudiant.stageAssocie){
        try {
            stage = await Stage.findOne({ etudiantsInscrits: numeroDA }); //I don't know if this works or not, but I feel like it won't
        } catch {
            return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
        }
        
        if (!stage) {
            return next(new HttpErreur("Aucun stage trouvé pour l'étudiant donné", 404));
        }

        //Removes student from class
        try {
            for(let etudiant of stage.etudiantsInscrits){
                if (etudiant == numeroDA) {
                    stage.etudiantsInscrits.splice(stage.etudiantsInscrits.indexOf(etudiant), 1);
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
        await etudiant.remove();
        //await stage.save(); //I am extremely confused. I commented this out because that exact line is higher up, but there is no transaction thing up there, so I don't know if it works or not
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(new HttpErreur("La suppression de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ message: "L'étudiant a été supprimé avec succès" });
}

const inscrireEtudiant = async (requete, reponse, next) => {
    const numeroDA = requete.params.numeroDA;
    const { stageId } = requete.body;

    if (!numeroDA) {
        return next(new HttpErreur("Vous devez spécifier un DA d'étudiant", 404));
    }

    if (!stageId) {
        return next(new HttpErreur("Vous devez spécifier un ID de cours", 404));
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

    let stage;
    try {
        stage = await Stage.findById(stageId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
    }

    if (!stage) {
        return next(new HttpErreur("Aucun stage trouvé pour l'ID donné"), 504);
    }

    try {
        etudiant.stageAssocie = stageId;
        stage.etudiantsInscrits.push(numeroDA);
        await etudiant.save();
        await stage.save();
    } catch {
        return next(new HttpErreur("Erreur lors de la mise à jour de l'étudiant", 500));
    }

    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
}

exports.getEtudiants = getEtudiants;
exports.ajouterEtudiant = ajouterEtudiant;
exports.accederEtudiant = accederEtudiant;
exports.modifierEtudiant = modifierEtudiant;
exports.supprimerEtudiant = supprimerEtudiant;
exports.inscrireEtudiant = inscrireEtudiant;