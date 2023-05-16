import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>Accueil</NavLink>
            </li>
            <li>
                <NavLink to="/" exact>Déroulement Stage Employeurs</NavLink>
            </li>
            <li>
                <NavLink to="/" exact>Profils étudiants</NavLink>
            </li>
            <li>
                <NavLink to="/" exact>Déroulement Stage Étudiants</NavLink>
            </li>
            <li>
                <NavLink to="/" exact>FAQ</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/connected`}>Connecté</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/disconnected`}>Déconnecté</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
