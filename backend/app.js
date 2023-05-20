const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const stageRoutes = require("./routes/stage-routes");
const etudiantRoutes = require("./routes/etudiant-routes");
const utilisateurRoutes = require("./routes/utilisateur-routes");
const HttpErreur = require("./models/http-erreur");

const app = express();
app.use(bodyParser.json());

app.use("/stages", stageRoutes);
app.use("/etudiants", etudiantRoutes);
app.use("/auth", utilisateurRoutes);

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