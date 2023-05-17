import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  // CHANGER BOOL ICI POUR TESTER
  auth.isLoggedIn = true;

  return (
    <ul className="nav_links">
      <li>
        <NavLink to="/" exact className="nav_links-button">
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/deroulement-stage-employeurs"
          exact
          className="nav_links-button"
        >
          Déroulement Stage Employeurs
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/deroulement-stage-etudiants"
          exact
          className="nav_links-button"
        >
          Déroulement Stage Étudiants
        </NavLink>
      </li>
      <li>
        <NavLink to="/profils-etudiants" exact className="nav_links-button">
          Profils étudiants
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/ajouter-stage`} className="nav_links-button">
            Ajouter Stage
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/ajouter-etudiant`} className="nav_links-button">
            Ajouter Étudiant
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink
            to={`/liste-stages-disponibles`}
            className="nav_links-button"
          >
            Liste Stages Disponibles
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/liste-etudiants`} className="nav_links-button">
            Liste Etudiants
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/faq" exact className="nav_links-button">
          FAQ
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
