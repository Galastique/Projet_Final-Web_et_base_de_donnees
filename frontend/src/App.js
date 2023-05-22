import React, { useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Accueil from "./accueil/pages/Accueil";
import DeroulementStageEmployeurs from "./deroulement-stage-employeurs/pages/DeroulementStageEmployeurs";
import DeroulementStageEtudiants from "./deroulement-stage-etudiants/pages/DeroulementStageEtudiants";
import ProfilsEtudiants from "./profils-etudiants/pages/ProfilsEtudiants";
import AjouterStage from "./ajouter-stage/pages/AjouterStage";
import AjouterEtudiant from "./ajouter-etudiant/pages/AjouterEtudiant";
import ListeStagesDisponibles from "./liste-stages/pages/ListeStages";
import ListeEtudiants from "./liste-etudiants/pages/ListeEtudiants";
import PagePersonnelleEtudiant from "./page-personnelle/pages/PagePersonnelleEtudiant";
import FAQ from "./faq/pages/Faq";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Footer from "./shared/components/Footer";
import Auth from "./shared/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import "./App.css";
import ListeStages from "./liste-stages/pages/ListeStages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userType, setUserType] = useState(false);

  const login = useCallback((userId, userType) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUserType(userType);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserType(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    switch (userType) {
      case "etudiant":
        routes = (
          <Switch>
            <Route path="/" exact>
              <Accueil />
            </Route>
            <Route path="/deroulement-stage-employeurs" exact>
              <DeroulementStageEmployeurs />
            </Route>
            <Route path="/deroulement-stage-etudiants" exact>
              <DeroulementStageEtudiants />
            </Route>
            <Route path="/profils-etudiants" exact>
              <ProfilsEtudiants />
            </Route>
            <Route path="/liste-stages-disponibles" exact>
              <ListeStagesDisponibles />
            </Route>
            <Route path="/:numeroDA/page-personnelle" exact>
              <PagePersonnelleEtudiant />
            </Route>
            <Route path="/faq" exact>
              <FAQ />
            </Route>
            <Redirect to="/" />
          </Switch>
        );
        break;
      case "coordonateur":
        routes = (
          <Switch>
            <Route path="/" exact>
              <Accueil />
            </Route>
            <Route path="/deroulement-stage-employeurs" exact>
              <DeroulementStageEmployeurs />
            </Route>
            <Route path="/deroulement-stage-etudiants" exact>
              <DeroulementStageEtudiants />
            </Route>
            <Route path="/profils-etudiants" exact>
              <ProfilsEtudiants />
            </Route>
            <Route path="/ajouter-etudiant" exact>
              <AjouterEtudiant />
            </Route>
            <Route path="/liste-stages-disponibles" exact>
              <ListeStagesDisponibles />
            </Route>
            <Route path="/liste-etudiants" exact>
              <ListeEtudiants />
            </Route>
            <Route path="/faq" exact>
              <FAQ />
            </Route>
            <Redirect to="/" />
          </Switch>
        );
        break;
      case "employeur":
        routes = (
          <Switch>
            <Route path="/" exact>
              <Accueil />
            </Route>
            <Route path="/deroulement-stage-employeurs" exact>
              <DeroulementStageEmployeurs />
            </Route>
            <Route path="/deroulement-stage-etudiants" exact>
              <DeroulementStageEtudiants />
            </Route>
            <Route path="/profils-etudiants" exact>
              <ProfilsEtudiants />
            </Route>
            <Route path="/ajouter-stage" exact>
              <AjouterStage />
            </Route>
            <Route path="/liste-stages-disponibles" exact>
              <ListeStagesDisponibles />
            </Route>
            <Route path="/faq" exact>
              <FAQ />
            </Route>
            <Redirect to="/" />
          </Switch>
        );
        break;
      default:
        console.error("Le type de compte de l'utilisateur est manquant.");
    }
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Accueil />
        </Route>
        <Route path="/deroulement-stage-employeurs" exact>
          <DeroulementStageEmployeurs />
        </Route>
        <Route path="/deroulement-stage-etudiants" exact>
          <DeroulementStageEtudiants />
        </Route>
        <Route path="/profils-etudiants" exact>
          <ProfilsEtudiants />
        </Route>
        <Route path="/faq" exact>
          <FAQ />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        userType: userType,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
