import React from "react";

import "./Footer.css";

const MainNavigation = (props) => {
  return (
    <footer className="main_footer">
      <p className="main_footer-coordinator">
        Coordonnateur des stages: Sylvain Labranche (
        <a
          href="mailto:sylvain.labranche@cmontmorency.qc.ca"
          className="main_footer-coordinator_link"
        >
          sylvain.labranche@cmontmorency.qc.ca
        </a>
        )
      </p>
      <p className="main_footer-changes">
        Dernière modification: [Insérer la date ici]
      </p>
    </footer>
  );
};

export default MainNavigation;
