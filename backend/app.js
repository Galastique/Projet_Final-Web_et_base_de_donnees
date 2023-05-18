const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const ajouterStageRoutes = require("./routes/ajouter-stage-routes");
const ajouterEtudiantRoutes = require("./routes/ajouter-etudiant-routes");
const listeStageDisponiblesRoutes = require("./routes/liste-stages-routes");
const listeEtudiantsRoutes = require("./routes/liste-etudiants-routes");
const HttpErreur = require("./models/http-erreur");

const app = express();
app.use(bodyParser.json());

app.use("/api/ajouter-stage-routes", ajouterStageRoutes);
app.use("/api/ajouter-etudiant-routes", ajouterEtudiantRoutes);
app.use("/api/liste-stages-routes", listeStageDisponiblesRoutes);
app.use("/api/liste-etudiants-routes", listeEtudiantsRoutes);

app.use((requete, reponse, next) => {
    return next(new HttpErreur("Route non trouvée", 404));
});

app.use((error, requete, reponse, next) => {
    if (reponse.headerSent) {
        return next(error);
    }
    reponse.status(error.code || 500);
    reponse.json({
        message: error.message || "Une erreur inconnue est survenue",
    });
});

mongoose.connect("mongodb://127.0.0.1:27017/").then(() => {
    app.listen(5000);
    console.log("Connexion à la base de données réussie");
}).catch((erreur) => {
    console.log(erreur);
});