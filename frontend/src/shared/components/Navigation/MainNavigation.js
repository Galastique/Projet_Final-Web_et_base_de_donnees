import React from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";

import Image from "../UIElements/Image";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  return (
    <header className="main-header">
      <Link to="/">
        <Image alt="logo-montmorency" src="/logo.png"></Image>
      </Link>
      <nav>
        <NavLinks />
      </nav>
    </header>
  );
};

export default MainNavigation;
