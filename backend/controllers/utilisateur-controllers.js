const HttpErreur = require("../models/http-erreur");
const { mongoose } = require("mongoose");

const Utilisateur = require("../models/utilisateur");

const inscription = async (requete, reponse, next) => {
    const { nom, courriel, motDePasse, type } = requete.body;

    let utilisateurExiste;

    try {
        utilisateurExiste = await Utilisateur.findOne({ courriel: courriel });
    } catch {
        return next(new HttpErreur("Erreur lors de la vérification de l'existence de l'utilisateur", 500))
    }

    if (utilisateurExiste) {
        return next(
            new HttpErreur("Cet utilisateur existe déjà, veuillez vous connecter", 422)
        );
    }

    let nouvelUtilisateur = new Utilisateur({
        nom, courriel, motDePasse, type
    });

    try {
        await nouvelUtilisateur.save();
    } catch (err) {
        console.error(err);
        return next(new HttpErreur("Erreur lors de l'ajout de l'utilisateur", 422));
    }

    reponse.json({
        message: "Inscription réussie!",
        utilisateur: nouvelUtilisateur.toObject({ getters: true })
    });
};

const connexion = async (requete, reponse, next) => {
    const { courriel, motDePasse } = requete.body;

    let utilisateurExiste;

    try {
        utilisateurExiste = await Utilisateur.findOne({ courriel: courriel });
    } catch {
        return next(new HttpErreur("Erreur lors de la vérification de l'existence de l'utilisateur", 500));
    }

    if (!utilisateurExiste || utilisateurExiste.motDePasse !== motDePasse) {
        return next(new HttpErreur("Le courriel ou le mot de passe est incorrect", 401));
    }

    reponse.json({
        message: "Connexion réussie!",
        utilisateur: utilisateurExiste.toObject({ getters: true })
    });
};

exports.inscription = inscription;
exports.connexion = connexion;