import React from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import Image from "../UIElements/Image";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  return (
    <header className="main_header">
      <Link to="/" className="main_header-main_link">
        <Image
          alt="logo-montmorency"
          src="/logo.png"
          className="main_header-image"
        ></Image>
        <div className="main_header-title">
          <h1>Projet Final - Web et bases de données</h1>
          <h3>
            Fait par Anthony Kessaris, Lorenzo Mignacca et Alexandre Rousseau
          </h3>
        </div>
      </Link>
      <nav className="main_header-navigation">
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainNavigation;
