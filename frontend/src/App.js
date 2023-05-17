import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Accueil from "./accueil/pages/Accueil";
import DeroulementStageEmployeurs from "./deroulement-stage-employeurs/pages/DeroulementStageEmployeurs";
import DeroulementStageEtudiants from "./deroulement-stage-etudiants/pages/DeroulementStageEtudiants";
import ProfilsEtudiants from "./profils-etudiants/pages/ProfilsEtudiants";
import AjouterStage from "./ajouter-stage/pages/AjouterStage";
import AjouterEtudiant from "./ajouter-etudiant/pages/AjouterEtudiant";
import ListeStagesDisponibles from "./liste-stages/pages/ListeStages";
import ListeEtudiants from "./liste-etudiants/pages/ListeEtudiants";
import FAQ from "./faq/pages/Faq";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    // TODO CHECK THE ACCOUNT TYPE (PROBABLY BY USING MORE IFS IN THIS ONE)
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
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
