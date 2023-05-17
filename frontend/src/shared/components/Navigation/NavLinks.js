import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav_links">
      <li>
        <NavLink to="/" exact className="nav_links-button">
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/deroulement-stage-employeurs/pages/DeroulementStageEmployeurs"
          exact
          className="nav_links-button"
        >
          Déroulement Stage Employeurs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profils-etudiants/pages/ProfilsEtudiants"
          exact
          className="nav_links-button"
        >
          Profils étudiants
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/deroulement-stage-etudiants/pages/DeroulementStageEtudiants"
          exact
          className="nav_links-button"
        >
          Déroulement Stage Étudiants
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq/pages/Faq" exact className="nav_links-button">
          FAQ
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink
            to={`/${auth.userId}/connected`}
            className="nav_links-button"
          >
            Connecté
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink
            to={`/${auth.userId}/disconnected`}
            className="nav_links-button"
          >
            Déconnecté
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
