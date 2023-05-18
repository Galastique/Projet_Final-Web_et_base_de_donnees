const { v4: uuidv4 } = require("uuid");
const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const Etudiant = require("../models/etudiant");
const Cours = require("../models/cours");

const getEtudiants = async (requete, reponse, next) => {
    let etudiants;

    try {
        etudiants = await Etudiant.find({});
    } catch {
        return next(new HttpErreur("Erreur accès étudiant"), 500);
    }

    reponse.json({ etudiants: etudiants.map(etudiant => etudiant.toObject({ getters: true })) });
};

const ajouterEtudiant = async (requete, reponse, next) => {
    const { nom, prenom } = requete.body;
    let etudiantExiste;

    if (!nom || !prenom) {
        return next(new HttpErreur("Vous devez spécifier un nom ET un prénom", 422))
    }

    try {
        etudiantExiste = await Etudiant.findOne({ nom: nom, prenom: prenom });
    } catch {
        return next(new HttpErreur("Échec vérification existance étudiant", 500));
    }

    if (etudiantExiste) {
        return next(new HttpErreur("Étudiant existe déjà!", 422))
    }

    let nouvelEtudiant = new Etudiant({ nom, prenom, cours: [] });
    try {
        await nouvelEtudiant.save();
    } catch {
        return next(new HttpErreur("Erreur lors de l'ajout de l'étudiant", 422))
    }

    reponse.status(201).json({ etudiant: nouvelEtudiant.toObject({ getter: true }) });
}

const accederEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;

    if (!etudiantId) {
        return next(new HttpErreur("Vous devez spécifier un ID d'étudiant", 404));
    }

    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour l'ID donné", 404));
    }

    reponse.json({ cours: etudiant.toObject({ getters: true }) });
}

const modifierEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    const { nom, prenom } = requete.body;

    if (!etudiantId) {
        return next(
            new HttpErreur("Vous devez spécifier l'ID de l'étudiant", 422)
        )
    }

    if (!nom && !prenom) {
        return next(
            new HttpErreur("Vous devez spécifier un nom ou un prénom", 422)
        )
    }

    let etudiant;
    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch {
        return next(new HttpErreur("L'ID fourni pour l'étudiant est invalide", 422));
    }

    if (!etudiant) {
        return next(new HttpErreur("Il n'y a pas d'étudiant pour l'ID donné", 504));
    }

    try {
        nom && (etudiant.nom = nom);
        prenom && (etudiant.prenom = prenom);
        await etudiant.save();
    } catch {
        return next(new HttpErreur("La modification de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ cours: etudiant.toObject({ getters: true }) });
}

const supprimerEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;

    if (!etudiantId) {
        return next(new HttpErreur("Vous devez spécifier un ID d'étudiant", 404));
    }

    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour l'ID donné", 404));
    }

    let listeCours = [];
    for (let i = 0; i < etudiant.cours.length; i++) {
        let cours;
        try {
            cours = await Cours.findById(etudiant.cours[i]);
        } catch {
            return next(new HttpErreur("Erreur lors de la récupération du cours", 500));
        }

        if (!cours) {
            return next(new HttpErreur("Aucun cours trouvé pour l'ID donné", 404));
        }

        listeCours.push(cours);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        for (let i = 0; i < listeCours.length; i++) {
            let etudiants = listeCours[i].etudiants;

            for (let j = 0; j < etudiants.length; j++) {
                if (listeCours[i].etudiants[j] == etudiant.id) {
                    await listeCours[i].etudiants.pull(etudiant);
                }
            }
            await listeCours[i].save();
        }

        await etudiant.remove();
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        return next(new HttpErreur("La suppression de l'étudiant a échouée", 500));
    }

    reponse.status(200).json({ message: "Étudiant supprimé avec succès" });
}

const inscrireEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    const { coursId } = requete.body;

    if (!etudiantId) {
        return next(new HttpErreur("Vous devez spécifier un ID d'étudiant", 404));
    }

    if (!coursId) {
        return next(new HttpErreur("Vous devez spécifier un ID de cours", 404));
    }

    let etudiant;
    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération de l'étudiant", 500));
    }

    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour l'ID donné", 404));
    }

    let cours;
    try {
        cours = await Cours.findById(coursId);
    } catch {
        return next(new HttpErreur("Erreur lors de la récupération du cours", 500));
    }

    if (!cours) {
        return next(new HttpErreur("Aucun cours trouvé pour l'ID donné"), 504);
    }

    try {
        etudiant.cours.push(coursId);
        cours.etudiants.push(etudiantId);
        await etudiant.save();
        await cours.save();
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